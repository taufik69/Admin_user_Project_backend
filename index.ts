import { app } from "./src/app.ts";
import { connectDatabase } from "./src/shared/config/database.ts";
import { env } from "./src/shared/config/env.ts";
import { logger } from "./src/shared/config/logger.config.ts";

connectDatabase().then(() => {
  
  app.listen(env.PORT, () => {
    // console.log('Server is running on http://localhost:3000');
     logger.info(
        `Server running in ${env.NODE_ENV} mode on port ${env.PORT}`
      );
  });
  logger.info('Server started on port 3000');
}).catch((error) => {
  console.error('Failed to connect to the database in index.ts:', error);
});