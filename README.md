# `java-web-bridge`

**`java-web-bridge`** is a simple NodeJS server which can serve any Java console application as a website. It creates an instance of the console application for each client, ensuring every client has its own session.
## Disclaimer
**The server exposes the Java app directly to the public**, so it's important to ensure it's secure, doesn't have an ability to modify files on your machine, or is sandboxed/secured in some other way. This software comes with no warranty, use it at your own risk. The main use case is to host simple text games and similar projects.

## Configuration
To run `java-web-bridge`, you **must** set the following environment variables (in an .env file or somewhere else):
- `JWB_PORT` - the port that the server should use
- `JWB_JAR_PATH` - the path of the .jar file to serve

Additionally, you can also specify:
- `JWB_APP_NAME` - the port that the server should use

```
JWB_PORT=
JWB_JAR_PATH=
```

## Requirements
- **NodeJS v23.9.0** or compatible
- a complatible **JRE** for your Java application

### NPM packages:
- **child_process** ^1.0.2
- **dotenv** ^16.5.0
- **express** ^5.1.0
- **fs** ^0.0.1-security
- **path** ^0.12.7
- **tslog** ^4.9.3
- **ws** ^8.18.1
