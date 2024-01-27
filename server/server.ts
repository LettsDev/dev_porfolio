require("dotenv").config();
import Fastify, { FastifyInstance, errorCodes } from "fastify";
import path from "path";
import fastifyStatic from "@fastify/static";
import cors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import { Notion } from "./notion";
import Mailer from "./mailer";
import ejs from "ejs";
const mailer = new Mailer(process.env.RESEND_API as string);
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
server.register(fastifyStatic, { root: path.join(__dirname, "dist") });
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
    const response = await notion.addNewPageToDb(
      data.name,
      data.email,
      data.description,
      testDB,
      userId
    );
    if (response)
      mailer.send(
        data.email,
        "Let's work together",
        await ejs.renderFile("./email/newClientTemplate.ejs", {
          clientName: data.name,
          clientDetails: data.description,
          clientEmail: data.email,
        })
      );
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send();
    return;
  } catch (err) {
    //attempt email notification
    mailer.send(
      "jared@lettsdev.ca",
      "LettsDev new client error",
      `<p>error: <strong>${err}</strong></p>`
    );
    reply
      .status(400)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ error: err });
    return;
  }
});

const start = async () => {
  try {
    if (process.env.ENVIRONMENT === "development") {
      console.log("server running in development mode");
    }
    const envPort = process.env.PORT;
    const envHost = process.env.HOSTNAME;
    await server.listen({
      port: !envPort ? 3000 : +envPort,
      host: !envHost ? "localhost" : envHost,
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
