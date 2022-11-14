const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
app.use(cors());
/*app.use(cors({ origin: "http://localhost:3000" }));*/

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productsRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connection successful"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productsRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.get("/api/test", () => {
  console.log("memeking");
});

app.listen(process.env.PORT || 5000, () => {});
