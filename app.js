const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const SampleModel = require("../SampleModel");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/test", async (req, res, next) => {
  try {
    const sample = await SampleModel.findOne({ where: { name: "test" } });
    return res.json(sample);
  } catch (err) {
    return res.status(500).json({ error: "test error" });
  }
});
app.post("/test", async (req, res, next) => {
  const { name, email } = req.body || {};
  if (!name || !email) {
    return res.status(422).json({ error: "name and email is required" });
  }
  try {
    const sample = await SampleModel.create({
      name,
      email,
    });
    res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "test error" });
  }
});

app.use((req, res, next) => {
  res.status(404).json({ error: "page not found" });
});

app.listen(process.env.PORT || 3000);
