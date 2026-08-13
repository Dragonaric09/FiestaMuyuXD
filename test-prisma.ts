import "dotenv/config";
import { prisma } from "./lib/prisma";

async function main() {
  try {
    const guest = await prisma.guest.create({
      data: {
        name: "Test User",
      },
    });
    console.log("Success:", guest);
  } catch (err: any) {
    console.error("Prisma Error:");
    console.error(err.message);
  }
}

main();
