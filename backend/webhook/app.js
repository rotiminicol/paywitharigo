// Webhook for Paystack events
app.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
   const crypto = require("crypto");
   const secret = process.env.PAYSTACK_SECRET_KEY;
   const hash = crypto
     .createHmac("sha512", secret)
     .update(JSON.stringify(req.body))
     .digest("hex");
 
   if (hash !== req.headers["x-paystack-signature"]) {
     return res.status(401).json({ error: "Invalid signature" });
   }
 
   const event = req.body;
   try {
     if (event.event === "charge.success") {
       const { reference, amount, authorization } = event.data;
       const transaction = await Transaction.findOne({ reference });
       if (transaction && transaction.status !== "completed") {
         transaction.status = "completed";
         await transaction.save();
 
         const user = await User.findById(transaction.userId);
         user.balance += amount / 100;
         if (authorization && authorization.reusable) {
           user.authorizationCode = authorization.authorization_code;
         }
         await user.save();
       }
     } else if (event.event === "transfer.success") {
       const { reference, amount } = event.data;
       const transaction = await Transaction.findOne({ reference });
       if (transaction && transaction.status !== "completed") {
         transaction.status = "completed";
         await transaction.save();
 
         const user = await User.findById(transaction.userId);
         user.balance -= amount / 100;
         await user.save();
       }
     }
 
     res.status(200).send("Webhook received");
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 });