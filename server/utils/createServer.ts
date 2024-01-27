import Fastify, { FastifyInstance, errorCodes } from "fastify";
import cors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifyStatic from "@fastify/static";
import path from "path";

const loggerConfig = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};
const environment = process.env.ENVIRONMENT as
  | "development"
  | "production"
  | "test";

const server: FastifyInstance = Fastify({
  logger: loggerConfig[environment] ?? true,
});

if (environment === "development" || environment === "test") {
  server.register(cors, {
    origin: "http://localhost:4321",
  });
}
server.register(fastifyStatic, { root: path.join(__dirname, "..", "dist") });
server.register(fastifyHelmet);
server.addContentTypeParser(
  "application/json",
  { parseAs: "string" },
  (req, body, done) => {
    try {
      if (typeof body === "string") {
        const json = JSON.parse(body);
        done(null, json);
        return;
      }
      console.error("not parsed correctly: ");
    } catch (err) {
      if (err instanceof errorCodes.FST_ERR_BAD_STATUS_CODE) {
        console.error(err);
      }
    }
  }
);
server.addHook("onSend", async function (request, reply) {
  reply.headers({
    "Content-Security-Policy":
      "default-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; script-src 'self' 'unsafe-inline'; font-src 'self' fonts.gstatic.com; img-src 'self' www.w3.org;",
  });
});

export default server;
