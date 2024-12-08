const express = require("express");
const app = express();
const cors = require("cors");
const allRoutes = require("./routes");
const { logMiddleware } = require("./middlewares");
const dotenv = require('dotenv');

dotenv.config();
const PORT = 5000;
app.use(express.json());
app.use(cors());

app.use("/api", logMiddleware, allRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
