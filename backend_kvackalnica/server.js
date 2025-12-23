const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Strežnik teče na portu ${PORT}`);
});

app.get("/", (req, res) => res.status(200).send("Kvackalnica backend OK"));
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));
