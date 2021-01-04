if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const express = require("express");
const router = require("./routes");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
