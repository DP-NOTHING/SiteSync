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
const socket = io("http://localhost:9002");

const DeploymentForm = () => {
  const [githubUrl, setGithubUrl] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");
  const [logs, setLogs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [deployPreviewURL, setDeployPreviewURL] = useState<
    string | undefined
  >();
  const logContainerRef = useRef<HTMLTextAreaElement>(null);

  const handleGithubUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setGithubUrl(e.target.value);
    },
    []
  );

  const handleProjectIdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setProjectId(e.target.value);
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // setLogs("Starting deployment...\n");

    axios
      .post(`${process.env.BACKEND_URL}/project`, {
        gitURL: githubUrl,
        slug: projectId,
      })
      .then((response) => {
        const { projectSlug, url } = response.data.data;
        setProjectId(projectSlug);
        setDeployPreviewURL(url);

        console.log(`Subscribing to logs:${projectSlug}`);
        socket.emit("subscribe", `logs:${projectSlug}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSocketIncommingMessage = useCallback((message: string) => {
    console.log(`[Incomming Socket Message]:`, typeof message, message);
    const { log } = JSON.parse(message);
    if (log.includes("Done")) {
      setIsSuccess(true);
      setIsLoading(false);
    }
    setLogs((prev) => [...prev, log]);
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
            required
          />
          <TextField
            label="Project ID/Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={projectId}
            onChange={handleProjectIdChange}
            required
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
