import express from "express";
import { createServer } from "http";

const app = express();
const server = createServer(app);

app.use(express.static("dist/client"));

app.get("*", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/assets/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Infineon React Example</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/assets/main.js"></script>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
