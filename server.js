const express = require("express");
const cors = require("cors");

const app = express();
const corsOpt = {
  origin: "http://localhost:2021",
};

app.use(cors(corsOpt));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello MCAP" });
});

const PORT = process.env.PORT || 2020;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
