const app = require("./app");

app.get("/", (req, res) => res.status(200).send("Kvackalnica backend OK"));
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Strežnik teče na portu ${PORT}`);
});
