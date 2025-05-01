# `java-web-bridge`

**`java-web-bridge`** is a simple NodeJS server which can serve any Java console application as a website. It creates an instance of the console application for each client, ensuring every client has its own session.
## Disclaimer
**The server exposes the Java app directly to the public**, so it's important to ensure it's secure, doesn't have an ability to modify files on your machine, or is sandboxed/secured in some other way. This software comes with no warranty, use it at your own risk. The main use case is to host simple text games and similar projects.