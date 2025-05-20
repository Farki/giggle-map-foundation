import app from "./app";
import config from "./config";

/**
 * Start Express server.
 */
app
  .listen(config.port, () => {
    console.log(
      `App is running at http://localhost:${config.port} in ${config.env} mode`,
    );
  })
  .on("error", (e) => console.error(e));
