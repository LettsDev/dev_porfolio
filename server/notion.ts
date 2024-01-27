import {
  Client,
  APIErrorCode,
  isNotionClientError,
  ClientErrorCode,
} from "@notionhq/client";
import "dotenv/config";
import { CreatePageResponse } from "@notionhq/client/build/src/api-endpoints";

export async function initNotion(): Promise<Client> {
  return await NotionWithError(() => {
    const notion = new Client({ auth: process.env.NOTION_TOKEN as string });
    return notion;
  });
}

export async function getDatabaseProps(notion: Client, db: string) {
  return await NotionWithError(() => {
    const dbObj = notion.databases.retrieve({ database_id: db });
    return dbObj;
  });
}
async function NotionWithError(callback: Function) {
  try {
    return callback();
  } catch (err) {
    if (isNotionClientError(err)) {
      switch (err.code) {
        case ClientErrorCode.RequestTimeout:
          console.error("notion client timeout");
          throw new Error("notion client timeout");
        case APIErrorCode.ObjectNotFound:
          console.error("couldn't find the Notion object");
          throw new Error("couldn't find the Notion object");
        case APIErrorCode.Unauthorized:
          console.error("unauthorized to get this resource from Notion");
          throw new Error("not authorized");
        // ...
        default:
      }
    }
  }
}

export class Notion {
  apiKey: string;
  notionClient: Client;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.notionClient = new Client({ auth: this.apiKey });
  }

  addNewPageToDb = async (
    title: string,
    email: string,
    details: string,
    databaseId: string,
    userId: string
  ): Promise<CreatePageResponse> => {
    return NotionWithError(async () => {
      const response = await this.notionClient.pages.create({
        parent: {
          database_id: databaseId,
        },
        properties: {
          title: [{ text: { content: title } }],
          Email: email,
        },
        children: [
          {
            object: "block",
            paragraph: { rich_text: [{ mention: { user: { id: userId } } }] },
          },
          {
            object: "block",
            heading_2: {
              rich_text: [
                {
                  text: {
                    content: "Details",
                  },
                },
              ],
            },
          },

          {
            object: "block",
            paragraph: { rich_text: [{ text: { content: details } }] },
          },
        ],
      });
      return response;
    });
  };

  getDbProps = async (db: string) => {
    return await NotionWithError(() => {
      const dbObj = this.notionClient.databases.retrieve({ database_id: db });
      return dbObj;
    });
  };
}
