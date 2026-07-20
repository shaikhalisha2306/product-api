const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(__dirname, "../data/orders.json");

router.post("/", (req, res) => {

    fs.readFile(filePath, "utf8", (err, data) => {

        if (err) {
            return res.status(500).json({
                message: "Error reading orders file"
            });
        }

        const orders = JSON.parse(data);

        const newOrder = {
            id: orders.length + 1,
            ...req.body
        };

        orders.push(newOrder);

        fs.writeFile(
            filePath,
            JSON.stringify(orders, null, 2),
            (err) => {

                if (err) {
                    return res.status(500).json({
                        message: "Error writing file"
                    });
                }

                res.status(201).json({
                    message: "Order created successfully",
                    order: newOrder
                });

            }
        );

    });

});

module.exports = router;