// index.ts
import { createApp } from "./app";

const startServer = async () => {
  try {
    const app = await createApp();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the application:", error);
  }
};

startServer();
