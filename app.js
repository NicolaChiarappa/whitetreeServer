const axios = require("axios").default;
// const { authapp, firestore } = require("./config");

// const { getAuth } = require("firebase-admin/auth");
// const { getFirestore } = require("firebase-admin/firestore");
const bodyparser = require("body-parser");

const express = require("express");
const cors = require("cors");

const app = express();

const port = 3000;

const stripe = require("stripe")(process.env.STRIPEKEY);

app.use(
  cors({
    origin: "https://www.underthewhitetree.it",
    optionsSuccessStatus: 200,
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

app.get("/success", (req, res) => {
  res.send(req.body);
});

app.post("/", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: "https://nice-pear-dalmatian-garb.cyclic.app/success",
      line_items: req.body,
      mode: "payment",
    });
    res.send(session.url);
  } catch {
    (e) => {
      res.send("qualcosa non va");
    };
  }
});

app.listen(port, () => {
  console.log("listen at port ", port);
});
