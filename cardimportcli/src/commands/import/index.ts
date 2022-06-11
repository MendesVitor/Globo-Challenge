import { Command } from "@oclif/core";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { cwd } from "node:process";
import { client } from "../../database";
import { parse } from "csv-parse";
import { createReadStream } from "node:fs";

export default class Import extends Command {
  static description = "Import card from CSV file to database";

  static examples = ["card import C:\\Users\\user\\Desktop\\test.csv"];

  static args = [
    {
      name: "path",
      description: "absolute path of the CSV file",
      required: true,
    },
  ];

  async run(): Promise<void> {
    const { args } = await this.parse(Import);

    const parser = parse(async (_, data) => {
      if (data.length < 1) {
        this.log("there is nothing to import");
        return;
      }

      let tagsResponse;
      const conn = await readFile(join(cwd(), "conn.txt"), {
        encoding: "utf8",
      });

      const db = client(conn);

      await db.connect();
      try {
        await db.query("BEGIN");

        for (let i = 1; i < data.length; i++) {
          if (data[i][0] && data[i][1]) {
            const cardsResponse = await db.query(
              `INSERT INTO card(text) VALUES('${data[i][0]}') RETURNING id`
            );

            for (const element of data[i][1].split(";")) {
              const tag = await db.query(
                `SELECT id FROM tag WHERE name = '${element}'`
              );
              if (tag.rowCount < 1) {
                tagsResponse = await db.query(
                  `INSERT INTO tag(name) VALUES('${element}') RETURNING id`
                );
              }

              await db.query(
                `INSERT INTO card_tags_tag("cardId","tagId") VALUES('${
                  cardsResponse.rows[0].id
                }','${tagsResponse?.rows[0].id ?? tag.rows[0].id}')`
              );
            }
          }
        }

        await db.query("COMMIT");
      } catch (error) {
        await db.query("ROLLBACK");

        this.log((error as Error).message);
      } finally {
        db.end();
        this.log("data imported");
      }
    });

    createReadStream(resolve(args.path))
      .on("error", (error) => {
        this.log((error as Error).message);
      })
      .pipe(parser)
      .on("error", (error) => {
        this.log((error as Error).message);
      });
  }
}
