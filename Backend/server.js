const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");

const app = express();

const dockerPublic = path.join(__dirname, "public");
const localPublic = path.join(__dirname, "../Frontend/public");

const publicDir = fs.existsSync(dockerPublic)
    ? dockerPublic
    : localPublic;

app.use(cors());
app.use(express.json());

// Static files
app.use(express.static(publicDir));

// API
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Pages
app.get("/", (req, res) => {
    const file = path.join(publicDir, "home.html");

    console.log("GET /");
    console.log("Serving:", file);
    console.log("Exists:", fs.existsSync(file));

    res.sendFile(file, (err) => {
        if (err) {
            console.error("sendFile error:", err);
            res.status(err.statusCode || 500).end();
        } else {
            console.log("home.html sent successfully");
        }
    });
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(publicDir, "home.html"));
});

app.get("/pricing", (req, res) => {
    res.sendFile(path.join(publicDir, "pricing.html"));
});

app.get("/aitext", (req, res) => {
    res.sendFile(path.join(publicDir, "aitext.html"));
});

app.get("/settings", (req, res) => {
    res.sendFile(path.join(publicDir, "settings.html"));
});


app.get("/login", (req, res) => {
    res.sendFile(path.join(publicDir, "login.html"));
});

app.get("/blockchain", (req, res) => {
    res.sendFile(path.join(publicDir, "blockchain.html"));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(publicDir, "signup.html"));
});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(publicDir, "dashboard.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(publicDir, "about.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(publicDir, "contact.html"));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(publicDir, "404.html"));
});

const PORT = process.env.PORT || 8080;

if (require.main === module) {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
