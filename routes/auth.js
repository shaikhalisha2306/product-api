const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(__dirname, "../data/users.json");

router.post("/signup", (req, res) => {

    fs.readFile(filePath, "utf8", (err, data) => {

        if (err) {
            return res.status(500).json({
                message: "Error reading users file"
            });
        }

        const users = JSON.parse(data);

        const newUser = {
            id: users.length + 1,
            ...req.body
        };

        users.push(newUser);

        fs.writeFile(
            filePath,
            JSON.stringify(users, null, 2),
            (err) => {

                if (err) {
                    return res.status(500).json({
                        message: "Error writing users file"
                    });
                }

                res.status(201).json({
                    message: "Signup successful",
                    user: newUser
                });
            }
        );

    });

});

router.post("/login", (req, res) => {

    fs.readFile(filePath, "utf8", (err, data) => {

        if (err) {
            return res.status(500).json({
                message: "Error reading users file"
            });
        }

        const users = JSON.parse(data);

        const { email, password } = req.body;

        const user = users.find(
            u => u.email === email && u.password === password
        );

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.json({
            message: "Login successful",
            user: user
        });

    });

});

module.exports = router;