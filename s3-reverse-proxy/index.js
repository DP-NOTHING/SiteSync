const express = require("express");
const httpProxy = require("http-proxy");
const cors = require("cors");
const app = express();
const PORT = 8000;

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

const BASE_PATH =
  "https://sitesync-output.s3.ap-south-1.amazonaws.com/__outputs";

const proxy = httpProxy.createProxy();

app.use((req, res) => {
  const hostname = req.hostname;

  if (!hostname) {
    return res.status(400).send("Invalid hostname");
  }

  const subdomain = hostname.split(".")[0];

  if (!subdomain) {
    return res.status(400).send("Invalid subdomain");
  }

  const resolvesTo = `${BASE_PATH}/${subdomain}`;

  return proxy.web(req, res, { target: resolvesTo, changeOrigin: true });
});

proxy.on("proxyReq", (proxyReq, req, res) => {
  const url = req.url;
  if (url === "/") proxyReq.path += "index.html";
});

app.listen(PORT, () => console.log(`Reverse Proxy Running..${PORT}`));
