const express = require("express");

const app = express();

const productRoutes = require("./routes/products");

const customerRoutes = require("./routes/customer");

app.use(express.json());

app.use("/products", productRoutes);

app.use("/customer", customerRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});