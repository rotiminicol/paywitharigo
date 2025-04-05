router.post("/send", protect, async (req, res) => {
   const { chatId, text } = req.body;
   try {
     const message = new Message({
       chatId,
       senderId: req.user.id,
       text,
       timestamp: new Date(),
     });
     await message.save();
 
     // Update chat's last message and unread count
     await Chat.findByIdAndUpdate(chatId, { lastMessage: text, $inc: { unreadCount: 1 } });
     res.json({ id: message._id });
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 });