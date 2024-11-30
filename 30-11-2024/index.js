const { createServer } = require("http");
const fs = require("fs");
const dummy = require("./dummy");
const path = require("path");
const PORT = 5000;

const server = createServer(async (req, res) => {
  if (req.url === "/") {
    try {
      const a = dummy();
      const newPath = path.join(__dirname, "/files/dummy.txt");
      fs.appendFileSync(newPath, "hello, world");
      res.end("Hello, wolrd!");
    } catch (error) {
      res.end("Error writing file");
    }
  }
  if (req.url === "/abc") {
    try {
      const folderPath = path.join(process.cwd(), "/files");
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
      const newPath = path.join(folderPath, "/dummy.txt");
      fs.appendFileSync(newPath, "hello, world");
      res.end("Hello, wolrd!");
    } catch (error) {
      res.end("Error writing file");
    }
  }
});
server.listen(PORT, () => {
  console.log(`http://127.0.0.1:${PORT}`);
});
