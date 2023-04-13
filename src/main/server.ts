import env from "./config/env";

async function main() {
  const app = (await import("./config/app")).default;
  app.listen(env.port, () =>
    console.log(`Server running at http://localhost:${env.port}`)
  );
}

main().catch(console.error);
