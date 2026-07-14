const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(__dirname,"../data/customer.json");

router.get("/", (req, res) => {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file" });
        }

        res.json(JSON.parse(data));
    });
});


router.post("/", (req, res) => {

    fs.readFile(filePath, "utf8", (err, data) => {

        if (err) {
            return res.status(500).json({
                message: "Error reading file"
            });
        }

        const customer = JSON.parse(data);

        const newcustomer = {
            id: customer.length + 1,
            ...req.body
        };

        customer.push(newcustomer);

        fs.writeFile(
            filePath,
            JSON.stringify(customer, null, 2),
            (err) => {

                if (err) {
                    return res.status(500).json({
                        message: "Error writing file"
                    });
                }

                res.status(201).json(newcustomer);
            }
        );

    });

});


router.delete("/:id", (req, res) => {

    fs.readFile(filePath, "utf8", (err, data) => {

        const customer = JSON.parse(data);

        const filtered = customer.filter(
            p => p.id !== Number(req.params.id)
        );

        if (filtered.length === customer.length) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        fs.writeFile(
            filePath,
            JSON.stringify(filtered, null, 2),
            (err) => {

                if (err) {
                    return res.status(500).json({
                        message: "Error writing file"
                    });
                }

                res.json({
                    message: "Product deleted"
                });
            }
        );

    });

});

module.exports = router;