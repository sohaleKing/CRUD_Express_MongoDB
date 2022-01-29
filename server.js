const express = require("express");
const cors = require("cors");

const app = express();
const corsOpt = {
  origin: "http://localhost:2021",
};

app.use(cors(corsOpt));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected!");
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Hello MCAP" });
});

require("./app/routes/owner.routes")(app);

const PORT = process.env.PORT || 2020;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
