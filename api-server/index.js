const express = require("express");
const { generateSlug } = require("random-word-slugs");
const { ECSClient, RunTaskCommand, ECS } = require("@aws-sdk/client-ecs");
const { Server } = require("socket.io");
const { default: axios } = require("axios");
const Redis = require("ioredis");

require("dotenv").config();

const { connect } = require("./db/connection.js");
const { setupMiddlewares } = require("./middleware/initmiddleware.js");
const { Project, ProjectList } = require("./db/schemas.js");

const app = express();
setupMiddlewares(app);

app.get("/", (req, res) => res.send("Hello World"));

const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL;
const SOCKET_PORT = process.env.SOCKET_PORT || 9002;
const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const ECS_CLUSTER = process.env.ECS_CLUSTER;
const ECS_TASK = process.env.ECS_TASK;
const SUBNET1 = process.env.SUBNET1;
const SUBNET2 = process.env.SUBNET2;
const SUBNET3 = process.env.SUBNET3;
const SECURITY_GROUP = process.env.SECURITY_GROUP;
const ELASTIC_URL = process.env.ELASTIC_URL;
const subscriber = new Redis(REDIS_URL);

const io = new Server({
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("subscribe", (channel) => {
    socket.join(channel);
    socket.emit("message", JSON.stringify({ log: `Joined logs:${channel}` }));
  });
});

const ecsClient = new ECSClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const config = {
  CLUSTER: ECS_CLUSTER,
  TASK: ECS_TASK,
};

app.use(express.json());
app.get("/checkid", async (req, res) => {
  const { projectid } = req.query;
  try {
    const resp = await axios.get(`${ELASTIC_URL}/${projectid}`);
    return res.send(false);
  } catch (e) {
    return res.send(true);
  }
});
app.post("/add-project", async (req, res) => {
  const { userid, projectname, giturl } = req.body;
  const project = new Project({
    userid,
    projectname,
    giturl,
    deploymentdate: new Date(),
    url: `http://${projectname}.localhost:8000`,
  });
  await project.save();

  const addProject = await ProjectList.findOne({
    userid,
  });

  if (addProject) {
    addProject.projectlist.push(project.projectname);
    await addProject.save();
  } else {
    const projectList = new ProjectList({
      userid,
      projectlist: [project.projectname],
    });
    await projectList.save();
  }

  return res.status(201).json(project);
});

app.get("/get-projects", async (req, res) => {
  const { userId } = req.query;
  console.log(userId);
  const document = await ProjectList.findOne({
    userid: userId,
  });
  if (!document) {
    return res.status(404).json({ error: "No projects found for this user" });
  }

  const transformedProjectList = document.projectlist.map((projectid) => ({
    id: projectid,
    name: projectid,
  }));

  return res.status(200).json(transformedProjectList);
});

app.get("/get-project", async (req, res) => {
  const { projectId } = req.query;
  const project = await Project.findOne({
    projectname: projectId,
  });

  if (!project) {
    return res.status(404).json({ error: "No project found" });
  }

  return res.json(project);
});

app.post("/project", async (req, res) => {
  const { gitURL, slug } = req.body;
  // console.log(
  //   "----inside project----------------------------------------------------------------------------------------------------------------------"
  // );
  // console.log(req);
  // console.log(
  //   "----finish project----------------------------------------------------------------------------------------------------------------------"
  // );
  const projectSlug = slug ? slug : generateSlug();
  // console.log(ECS_CLUSTER, ECS_TASK, SUBNET1, SUBNET2, SUBNET3, SECURITY_GROUP);
  // console.log("ASfasf");
  const command = new RunTaskCommand({
    cluster: config.CLUSTER,
    taskDefinition: ECS_TASK,
    launchType: "FARGATE",
    count: 1,
    networkConfiguration: {
      awsvpcConfiguration: {
        assignPublicIp: "ENABLED",
        subnets: [SUBNET1, SUBNET2, SUBNET3],
        securityGroups: [SECURITY_GROUP],
      },
    },
    overrides: {
      containerOverrides: [
        {
          name: "builder-image",
          environment: [
            { name: "GIT_REPOSITORY__URL", value: gitURL },
            { name: "PROJECT_ID", value: projectSlug },
            { name: "AWS_REGION", value: AWS_REGION },
            { name: "AWS_ACCESS_KEY_ID", value: AWS_ACCESS_KEY_ID },
            { name: "AWS_SECRET_ACCESS_KEY", value: AWS_SECRET_ACCESS_KEY },
            { name: "REDIS_URL", value: REDIS_URL },
          ],
        },
      ],
    },
  });

  await ecsClient.send(command);

  return res.json({
    status: "queued",
    data: { projectSlug, url: `http://${projectSlug}.localhost:8000` },
  });
});

async function initRedisSubscribe() {
  console.log("Subscribed to logs....");
  subscriber.psubscribe("logs:*");
  subscriber.on("pmessage", (pattern, channel, message) => {
    io.to(channel).emit("message", message);
  });
}

initRedisSubscribe();

app.get("/test", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, async () => {
  const connected = await connect();
  io.listen(SOCKET_PORT, () =>
    console.log(`Socket Server ${SOCKET_PORT} Running..`)
  );
  connected
    ? console.log(`coonected to DB\nServer is running on PORT: ${PORT}
-------------------------------------`)
    : console.log("Server starting failed");
});
