

// const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const express = require("express");
const logger = require("firebase-functions/logger");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Success!" });
});

app.post("/payment/create", async (req, res) => {
  try {
    const total = Number(req.query.total);

    if (!total || total <= 0) {
      return res.status(403).json({
        message: "Total must be greater than 0",
      });
    }

    console.log("Payment received:", total);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // cents
      currency: "usd",
    });

    // ✅ SEND RESPONSE ONCE
    return res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
});

exports.api = onRequest(app);


// got it from the vedio
// // const { setGlobalOptions } = require("firebase-functions");
// const { onRequest } = require("firebase-functions/https");
// const logger = require("firebase-functions/logger");
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();
// const stripe = require("stripe")(process.env.STRIPE_KEY);

// // setGlobalOptions({ maxInstances: 10 });

// const app = express();
// app.use(cors({ origin: true }));

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Success !",
//   });
// });

// app.post("/payment/create", async (req, res) => {
//   const total = req.query.total;
//   if (total > 0) {
//     console.log("payment recieved", total);
//     res.send(total);
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: total,
//       currency: "usd",
//     });
//     console.log(paymentIntent);

//     res.status(201).json(paymentIntent);
//   } else {
//     res.status(403).json({
//       message: "total must be greater than 0",
//     });
//   }
// });

// exports.api = onRequest(app);


