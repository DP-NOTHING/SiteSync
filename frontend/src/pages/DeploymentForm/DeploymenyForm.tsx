import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  TextareaAutosize,
} from "@mui/material";
import axios from "axios";
import { io } from "socket.io-client";
import { useAuth } from "@clerk/clerk-react";
const socket = io("http://localhost:9002");

const DeploymentForm = () => {
  const [githubUrl, setGithubUrl] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");
  const [giturlError, setGiturlError] = useState<string>("");
  const [idError, setIdError] = useState<string>("");
  const [logs, setLogs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const user = useAuth();
  const [deployPreviewURL, setDeployPreviewURL] = useState<
    string | undefined
  >();
  const logContainerRef = useRef<HTMLTextAreaElement>(null);

  const handleGithubUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setGithubUrl(e.target.value);
      setGiturlError("");
    },
    []
  );

  // const validProjectId = (projectId: string) => {
  //   return axios
  //     .get(`${import.meta.env.VITE_BACKEND_URL}/checkid`, {
  //       params: { projectId: projectId },
  //     })
  //     .then((response) => response.data === true)
  //     .catch(() => true);
  // };
  // const validProjectId = async (projectId: string) => {
  //   try {
  //     const response = await axios.get(
  //       `
  //       ${import.meta.env.VITE_BACKEND_URL}/checkid`,
  //       {
  //         params: { projectId: projectId },
  //       }
  //     );
  //     console.log(response.data);
  //     console.log("asqwwwwwwwwwwwwwwwwww");
  //   } catch (error) {
  //     return true;
  //   }
  // };
  const validateUrl = (url: string): boolean => {
    const regex =
      /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;
    return regex.test(url);
  };
  const handleProjectIdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setProjectId(e.target.value);
      setIdError("");
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateUrl(githubUrl)) {
      setGiturlError("Invalid GitHub URL");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/checkid`, {
        params: { projectid: projectId },
      })
      .then((response) => {
        if (response.data === true) {
          console.log(response);
          setLogs(["Starting deployment...\n"]);
          axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/project`, {
              gitURL: githubUrl,
              slug: projectId,
            })
            .then((response) => {
              const { projectSlug, url } = response.data.data;
              setProjectId(projectSlug);
              setDeployPreviewURL(url);

              axios.post(`${import.meta.env.VITE_BACKEND_URL}/add-project`, {
                userid: user.userId,
                projectname: projectSlug,
                giturl: githubUrl,
              });

              console.log(`Subscribing to logs:${projectSlug}`);
              socket.emit("subscribe", `logs:${projectSlug}`);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          setIdError("Project ID already exists");
          return;
        }
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };

  const handleSocketIncommingMessage = useCallback((message: string) => {
    console.log(`[Incomming Socket Message]:`, typeof message, message);
    console.log(message);
    const { log } = JSON.parse(message);
    if (log.includes("Done")) {
      setIsSuccess(true);
      setIsLoading(false);
    }
    setLogs((prev) => [...prev, log]);
    console.log(log);
    logContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    socket.on("message", handleSocketIncommingMessage);

    return () => {
      socket.off("message", handleSocketIncommingMessage);
    };
  }, [handleSocketIncommingMessage]);

  const memoizedLogs = useMemo(() => logs, [logs]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Deployment Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="GitHub URL"
            variant="outlined"
            fullWidth
            margin="normal"
            value={githubUrl}
            onChange={handleGithubUrlChange}
            error={!!giturlError}
            helperText={giturlError}
            sx={{
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.7)",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#8b5cf6",
                },
              },
              "& .MuiFormLabel-root": {
                color: "rgba(255, 255, 255, 0.7)",
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: "white",
              },
            }}
            required
          />
          <TextField
            label="Project ID/Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={projectId}
            onChange={handleProjectIdChange}
            helperText={idError}
            error={!!idError}
            required
            sx={{
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.7)",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#8b5cf6",
                },
              },
              "& .MuiFormLabel-root": {
                color: "rgba(255, 255, 255, 0.7)",
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: "white",
              },
            }}
          />
          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
              startIcon={isLoading && <CircularProgress size={20} />}
            >
              {isLoading ? "Deploying..." : "Deploy"}
            </Button>
          </Box>
        </form>
        {isSuccess && (
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              href={deployPreviewURL}
            >
              {deployPreviewURL}
            </Button>
          </Box>
        )}

        {logs.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Deployment Logs
            </Typography>
            <TextareaAutosize
              minRows={10}
              style={{ width: "100%" }}
              value={memoizedLogs}
              ref={logContainerRef}
              readOnly
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default DeploymentForm;
