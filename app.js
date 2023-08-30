const axios = require("axios").default;
// const { authapp, firestore } = require("./config");
require("dotenv").config();
// const { getAuth } = require("firebase-admin/auth");
// const { getFirestore } = require("firebase-admin/firestore");
const bodyparser = require("body-parser");
const https = require("https");
const fs = require("fs");

const express = require("express");
const cors = require("cors");

const app = express();

const port = 80;

const stripe = require("stripe")(process.env.STRIPEKEY);

app.listen(port, () => {
  console.log("listen at port ", port);
});

app.use(
  cors({
    origin: "https://www.underthewhitetree.it",
  })
);
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send(req.headers);
});

app.post("/", async (req, res) => {
  console.log(req.body[0]["price_data"]);
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: "https://www.underthewhitetree.it/store",
      line_items: req.body,
      mode: "payment",
    });
    res.send(session.url);
  } catch {
    (e) => {
      res.send("non va");
    };
  }
});
