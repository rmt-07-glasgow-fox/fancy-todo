if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const express = require("express");
const router = require("./routes");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Fancy Todo app listening at http://localhost:${port}`);
});
