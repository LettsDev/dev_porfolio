import Fastify, { FastifyInstance, errorCodes } from "fastify";
import path from "path";
import fastifyStatic from "@fastify/static";
import cors from "@fastify/cors";
import { Notion } from "./notion";

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
server.register(cors, {
  origin: "http://localhost:4321",
});
server.register(fastifyStatic, { root: path.join(__dirname, "dist") });

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

server.post("/contact", async (req, reply) => {
  try {
    const data = req.body as {
      name: string;
      email: string;
      description: string;
    };
    const testDB = process.env.TEST_DB as string;
    const userId = process.env.NOTION_USER_ID as string;
    const notion = new Notion(process.env.NOTION_TOKEN as string);
    const props = await notion.getDbProps(testDB);
    console.log("props: ", props);
    const response = await notion.addNewPageToDb(
      data.name,
      data.email,
      data.description,
      testDB,
      userId
    );
    console.log("new page response: ", response);
    if (response)
      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send();
    return;
  } catch (err) {
    reply
      .status(400)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ error: err });
    return;
  }
});

const start = async () => {
  try {
    const envPort = process.env.PORT;
    const envHost = process.env.HOSTNAME;
    await server.listen({
      port: !envPort ? 3000 : +envPort,
      host: !envHost ? "localhost" : envHost,
    });

    const address = server.server.address();
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
