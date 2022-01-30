const express = require("express");
const bodyParser = require("body-parser");
require("body-parser-xml")(bodyParser);
const cors = require("cors");

const app = express();
const corsOpt = {
  origin: "http://localhost:2021",
};

app.use(cors(corsOpt));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  bodyParser.xml({
    xmlParseOptions: {
      explicitArray: false, // Only put nodes in array if >1
    },
  })
);

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
