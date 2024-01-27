import { Resend } from "resend";
export default class Mailer {
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
