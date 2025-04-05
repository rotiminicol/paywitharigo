router.get("/:chatId", protect, async (req, res) => {
   try {
     const messages = await Message.find({ chatId: req.params.chatId }).sort("timestamp");
     res.json(messages);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 });