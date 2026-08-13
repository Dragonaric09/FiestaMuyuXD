import { Client } from "pg";

async function main() {
  const connectionStrings = [
    "postgresql://bdfiesta_user:5muLbau9ku9AH0jFliV9Q05VA7Ul4yCj@dpg-d9uesl7lk1mc73en4e20-a.ohio-postgres.render.com/bdfiesta",
    "postgresql://bdfiesta_user:5muLbau9ku9AH0jFliV9Q05VA7Ul4yCj@dpg-d9uesl7lk1mc73en4e20-a.ohio-postgres.render.com/postgres",
    "postgresql://bdfiesta_user:5muLbau9ku9AH0jFliV9Q05VA7Ul4yCj@dpg-d9uesl7lk1mc73en4e20-a.ohio-postgres.render.com/bdfiesta_user"
  ];

  for (const str of connectionStrings) {
    console.log("Trying", str);
    const client = new Client({
      connectionString: str,
      ssl: { rejectUnauthorized: false }
    });

    try {
      await client.connect();
      console.log("SUCCESS:", str);
      await client.end();
      return;
    } catch (err: any) {
      console.error("FAILED:", err.message);
    }
  }
}

main();
