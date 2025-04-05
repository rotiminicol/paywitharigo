import { MdSend, MdSearch } from "react-icons/md";
import { IoVideocam, IoCall } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const chatContainerRef = useRef(null);
  const queryClient = useQueryClient();

  // Fetch authenticated user
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  // Fetch chat list
  const { 
    data: chatList = [], 
    isLoading: chatListLoading, 
    error: chatListError 
  } = useQuery({
    queryKey: ["chatList"],
    queryFn: async () => {
      const { data } = await axios.get("/api/messages/chats");
      return data;
    },
    refetchInterval: 10000, // Refresh every 10 seconds
    enabled: !!authUser
  });

  // Fetch messages for selected chat
  const { 
    data: messages = [], 
    refetch: refetchMessages 
  } = useQuery({
    queryKey: ["messages", selectedChat?.id],
    queryFn: async () => {
      if (!selectedChat) return [];
      const { data } = await axios.get(`/api/messages/${selectedChat.id}`);
      return data;
    },
    enabled: !!selectedChat,
    onSuccess: () => {
      scrollToBottom();
    }
  });

  // Send message mutation
  const { mutate: sendMessage } = useMutation({
    mutationFn: async (messageText) => {
      const { data } = await axios.post("/api/messages/send", {
        chatId: selectedChat.id,
        text: messageText
      });
      return data;
    },
    onSuccess: () => {
      setNewMessage("");
      queryClient.invalidateQueries(["chatList"]);
      refetchMessages();
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to send message");
    }
  });

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;
    sendMessage(newMessage.trim());
  };

  const startVideoCall = () => toast("Video calling feature coming soon!");
  const startVoiceCall = () => toast("Voice calling feature coming soon!");

  // Filter chats based on search query
  const filteredChats = chatList.filter(chat => 
    chat.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Animation variants
  const chatVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const messageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-900 text-white">
      {/* Chat List Sidebar */}
      <div className="w-full md:w-96 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 bg-gray-800">
          <h2 className="text-xl font-bold">Messages</h2>
          <div className="mt-3 flex items-center gap-2 bg-gray-700 rounded-full p-2">
            <MdSearch className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chats..."
              className="w-full bg-transparent outline-none text-gray-300 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-2">
          {chatListLoading ? (
            <div className="flex justify-center p-4">
              <p className="text-gray-400">Loading chats...</p>
            </div>
          ) : chatListError ? (
            <div className="flex justify-center p-4">
              <p className="text-red-400">Error loading chats</p>
            </div>
          ) : filteredChats.length === 0 ? (
            <div className="flex justify-center p-4">
              <p className="text-gray-400">
                {searchQuery ? "No matching chats" : "No chats available"}
              </p>
            </div>
          ) : (
            filteredChats.map((chat) => (
              <motion.div
                key={chat.id}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                  selectedChat?.id === chat.id ? "bg-gray-700" : "hover:bg-gray-800"
                }`}
                onClick={() => setSelectedChat(chat)}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                  {chat.avatar ? (
                    <img src={chat.avatar} alt={chat.username} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-lg font-bold uppercase">
                      {chat.username[0]}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{chat.username}</p>
                  <p className="text-sm text-gray-400 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <span className="bg-blue-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-gray-800">
        <AnimatePresence>
          {selectedChat ? (
            <motion.div
              variants={chatVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-1 flex flex-col"
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-700 bg-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer"
                    onClick={() => setSelectedChat(null)}
                  >
                    {selectedChat.avatar ? (
                      <img 
                        src={selectedChat.avatar} 
                        alt={selectedChat.username} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="font-bold uppercase">
                        {selectedChat.username[0]}
                      </span>
                    )}
                  </div>
                  <span className="font-semibold">{selectedChat.username}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    className="p-2 rounded-full hover:bg-gray-700"
                    onClick={startVideoCall}
                    aria-label="Start video call"
                  >
                    <IoVideocam className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 rounded-full hover:bg-gray-700"
                    onClick={startVoiceCall}
                    aria-label="Start voice call"
                  >
                    <IoCall className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-3"
              >
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400">
                      Start a conversation with {selectedChat.username}
                    </p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id || msg.timestamp}
                        variants={messageVariants}
                        initial="hidden"
                        animate="visible"
                        className={`flex ${
                          msg.senderId === authUser?.id ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            msg.senderId === authUser?.id
                              ? "bg-blue-600"
                              : "bg-gray-700"
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p className="text-xs text-gray-300 mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Message Input */}
              <form 
                onSubmit={handleSendMessage}
                className="p-4 border-t border-gray-700"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-3 rounded-full bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Type your message"
                  />
                  <button
                    type="submit"
                    className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
                    disabled={!newMessage.trim()}
                    aria-label="Send message"
                  >
                    <MdSend className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center p-6"
              >
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  Select a chat
                </h3>
                <p className="text-gray-500">
                  Choose an existing conversation or start a new one
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Messages;