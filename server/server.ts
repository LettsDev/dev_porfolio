require("dotenv").config();
import notion from "./notion";
import mailer from "./mailer";
import ejs from "ejs";
import server from "./utils/createServer";

// notion config env variables
const clientDB = process.env.TEST_DB;
const userId = process.env.NOTION_USER_ID;
!clientDB ? console.error("missing Notion DB variable") : null;
!userId ? console.error("missing Notion user variable") : null;

server.post("/contact", async (req, reply) => {
  try {
    const data = req.body as {
      name: string;
      email: string;
      description: string;
    };

    const response = await notion.addNewPageToDb(
      data.name,
      data.email,
      data.description,
      clientDB as string,
      userId as string
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
