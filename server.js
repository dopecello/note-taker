const express = require("express");
const app = express();
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes  = require("./routes/htmlRoutes");

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Use Router
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Delete note ...

// Server initialization...
app.listen(PORT, () => {
  console.log(`Notetaking occurring on port ${PORT}`);
});
