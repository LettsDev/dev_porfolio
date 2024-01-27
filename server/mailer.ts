import { Resend } from "resend";
require("dotenv").config();
class Mailer {
  api_key: string;
  #resend;
  constructor(api_key: string) {
    this.api_key = api_key;
    const resend = new Resend(api_key);
    this.#resend = resend;
  }
  send = async (recipient: string, subject: string, body: string) => {
    const { data, error } = await this.#resend.emails.send({
      from: "Mailer <mailer@lettsdev.ca>",
      to: [recipient],
      subject: subject,
      html: body,
    });
    if (error) {
      return console.error(error);
    }
    console.log(data);
  };
}

const mailerAPI = process.env.RESEND_API;
if (!mailerAPI) {
  console.error("missing mailer API key!!");
}
const mailer = new Mailer(mailerAPI as string);
export default mailer;
