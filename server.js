const express = require("express");

const app = express();

const productRoutes = require("./routes/products");

const customerRoutes = require("./routes/customer");

app.use(express.json());

app.use("/products", productRoutes);

app.use("/customer", customerRoutes);


const auth = require("./middleware/auth");
app.use("/products", auth, productRoutes);

const authRoutes = require("./routes/auth");
app.use("/", authRoutes);

const orderRoutes = require("./routes/orders");
app.use("/orders", orderRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});