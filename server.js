const { Logger } = require("tslog");
const { spawn } = require("child_process");
const express = require("express");
const fs = require("fs");
const package = require("./package.json");
const path = require("path");
const WebSocket = require("ws");

const logger = new Logger();
const configuration = loadConfiguration();

server();

function server() {
  const app = express();

  app.use(express.static("public"));

  app.get("/", (req, res) => {
    res.send(getHtml());
  });

  const server = app.listen(configuration.port, () => {
    logger.info(
      `java-web-bridge is running on http://localhost:${configuration.port}`
    );
  });

  const wss = new WebSocket.Server({ server });
  
  wss.on("connection", handleWebsocketConnection);
}

function handleWebsocketConnection(ws, req) {
  const clientIp = req.socket.remoteAddress;
  const javaProcess = spawn("java", ["-jar", configuration.jarPath]);

  logger.info(`Client ${clientIp} connected`);

  javaProcess.stdout.on("data", (data) => {
    ws.send(data.toString());
  });

  ws.on("message", (message) => {
    logger.info(`Message received from ${clientIp}: ${message}`);
    javaProcess.stdin.write(message + "\n");
  });

  ws.on("close", () => {
    logger.info(`Client ${clientIp} disconnected`);
    javaProcess.kill();
  });
}

function getHtml() {
  const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
  return html.replace("__TITLE__", configuration.appName);
}

function loadConfiguration() {
  require("dotenv").config();

  const port = process.env.JWB_PORT;
  if (!port) {
    logger.error("JWB_PORT environment variable is not set");
    process.exit(1);
  }

  const jarPath = process.env.JWB_JAR_PATH;
  if (!jarPath) {
    logger.error("JWB_JAR_PATH environment variable is not set");
    process.exit(1);
  }

  const appName = process.env.JWB_APP_NAME ?? package.name;

  return {
    port: parseInt(port, 10),
    jarPath: jarPath,
    appName: appName,
  };
}
