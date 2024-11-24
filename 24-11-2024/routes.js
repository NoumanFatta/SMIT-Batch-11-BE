var fs = require("fs");

const hello = (res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(JSON.stringify({ text: "Hello" }));
};
const html = (res) => {
  try {
    const data = fs.readFileSync("./files/index.html");
    res.writeHead(200, { "content-type": "text/html" });
    res.end(data);
  } catch (error) {
    res.end("Error reading file");
  }
};
const append = (res) => {
  fs.appendFile("./files/mynewfile1.txt", "Hello content!", (err) => {
    if (err) {
      res.end("Error saving file..");
      return;
    }
    console.log("Saved!");
    return res.end("File has been saved!");
  });
};
module.exports = { hello, html, append };
