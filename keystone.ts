const { config, list } = require("@keystone-6/core");
const { allowAll } = require("@keystone-6/core/access");
const { text, password } = require("@keystone-6/core/fields");
const { statelessSessions } = require("@keystone-6/core/session");
const { createServer } = require("http");
const { WebSocketServer } = require("ws");

const lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
      password: password({ validation: { isRequired: true } }),
    },
  }),
};
export default config({
  db: {
    provider: "sqlite",
    url: "file:./keystone.db",
  },
  lists,
  session: statelessSessions({
    secret: "12QWWEDPIJNERN4567FGQWVB4543B NHGNTRBRTB",
  }),
  server: {
    port: 8000,
    extendExpressApp: (app, createContext) => {
      const server = createServer(app);

      const wss = new WebSocketServer({ server });

      wss.on("connection", (ws) => {
        console.log("Client connected");

        ws.on("message", (message) => {
          console.log(`Received message: ${message}`);

          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(message);
            }
          });
        });

        ws.on("close", () => {
          console.log("Client disconnected");
        });
      });

      server.listen(3000, () => {
        console.log("KeystoneJS server listening on port 3000");
      });
    },
  },
});
