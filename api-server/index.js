const express = require("express");
const { generateSlug } = require("random-word-slugs");
const { ECSClient, RunTaskCommand } = require("@aws-sdk/client-ecs");
const { Server } = require("socket.io");
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
const ECS_CLUSTER = process.env.CLUSTER;
const ECS_TASK = process.env.TASK;

const subscriber = new Redis(REDIS_URL);

const io = new Server({ cors: "*" });

io.on("connection", (socket) => {
  socket.on("subscribe", (channel) => {
    socket.join(channel);
    socket.emit("message", `Joined ${channel}`);
  });
});

io.listen(SOCKET_PORT, () =>
  console.log(`Socket Server ${SOCKET_PORT} Running..`)
);

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
    addProject.projectlist.push(project._id);
    await addProject.save();
  } else {
    const projectList = new ProjectList({
      userid,
      projectlist: [project._id],
    });
    await projectList.save();
  }

  return res.status(201).json(project);
});

app.get("/get-projects", async (req, res) => {
  const { userid } = req.query;
  const projectList = await ProjectList.findOne({ userid }).populate(
    "projectlist"
  );
  return res.json(projectList);
});

app.post("/project", async (req, res) => {
  // const { gitURL, slug } = req.body;
  // const projectSlug = slug ? slug : generateSlug();

  // const command = new RunTaskCommand({
  //   cluster: config.CLUSTER,
  //   taskDefinition: config.TASK,
  //   launchType: "FARGATE",
  //   count: 1,
  //   networkConfiguration: {
  //     awsvpcConfiguration: {
  //       assignPublicIp: "ENABLED",
  //       subnets: ["", "", ""],
  //       securityGroups: [""],
  //     },
  //   },
  //   overrides: {
  //     containerOverrides: [
  //       {
  //         name: "builder-image",
  //         environment: [
  //           { name: "GIT_REPOSITORY__URL", value: gitURL },
  //           { name: "PROJECT_ID", value: projectSlug },
  //         ],
  //       },
  //     ],
  //   },
  // });

  // await ecsClient.send(command);

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
  connected
    ? console.log(`coonected to DB\nServer is running on PORT: ${PORT}
-------------------------------------`)
    : console.log("Server starting failed");
});
