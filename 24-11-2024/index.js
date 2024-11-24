const { createServer } = require("http");
const a = require("./variable");
var fs = require("fs");
const PORT = 5000
const { hello, html, append } = require("./routes");
const fakePromis = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res("Hello");
    }, 5000);
  });
};

createServer(async (req, res) => {
  if (req.url === "/hello" && req.method === "GET") {
    hello(res);
  } else if (req.url === "/html" && req.method === "GET") {
    html(res);
  } else if (req.url === "/append" && req.method === "POST") {
    append(res);
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(PORT, () => {
  console.log(`Server running on port = ${PORT}`);
});
