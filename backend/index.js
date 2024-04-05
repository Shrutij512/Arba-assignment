const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./config/db")
const { Authenticate } = require('./middleware/Authenticate');
const User = require('./models/UserModel');

const app = express();

app.use(cors({
    origin: "*"
}))

app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send(`Base API endpoint !!!`);
})

app.post("/signup", async(req, res) => {
    try {
        const { fullName, userName, email, password, avatar } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }
        bcrypt.hash(password, 5, async function(err, hash) {
            await User.create({
                fullName,
                userName,
                email,
                password: hash,
                avatar
            });
            res.send({ message: "User signed up successfully ..." });
        });
    } catch (error) {
        console.log(error);
        res.send("Error");
    }
})

app.post("/login", async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Signup first" });
        }

        const hashedPassword = user.password;

        bcrypt.compare(password, hashedPassword, (err, result) => {
            if (result) {
                const token = jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN);
                return res.json({ message: "Login successful", token });
            } else {
                return res.status(401).json({ message: "Login failed" });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

app.use(Authenticate);

app.listen(PORT, async() => {
    try {
        await connection;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
    console.log(`Listening on port ${PORT}`);
})