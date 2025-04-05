// Send a new message
router.post("/send", protect, async (req, res) => {
   const { chatId, text } = req.body;
   if (!text || !text.trim()) {
     return res.status(400).json({ error: "Message text is required" });
   }
   try {
     // Verify chat exists and user is participant
     const chat = await Chat.findOne({
       _id: chatId,
       participants: req.user.id
     });
     if (!chat) {
       return res.status(403).json({ error: "Not authorized for this chat" });
     }
     // Create new message
     const message = new Message({
       chatId,
       senderId: req.user.id,
       text: text.trim(),
     });
     await message.save();
     
     // Update chat's last message and increment unread count for other participants
     const otherParticipants = chat.participants.filter(
       p => p.toString() !== req.user.id
     );
     
     const updateData = {
       lastMessage: text.trim(),
       updatedAt: Date.now()
     };
     
     // Increment unread count for other participants
     otherParticipants.forEach(participantId => {
       updateData[`unreadCount.${participantId}`] = (chat.unreadCount.get(participantId) || 0) + 1;
     });
     
     await Chat.findByIdAndUpdate(chatId, { $set: updateData });
     
     res.status(201).json(message);
   } catch (error) {
     console.error("Error sending message:", error);
     res.status(500).json({ error: "Failed to send message" });
   }
 });
 
 module.exports = router;