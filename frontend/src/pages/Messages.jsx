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
  const { data: authUser } = useQuery({ 
    queryKey: ["authUser"],
    // Adding queryFn to fix missing requirement
    queryFn: async () => {
      const { data } = await axios.get("/api/user");
      return data;
    }
  });

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
      setTimeout(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }, 100); // Small delay to ensure all content is rendered
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

  // Enhanced animation variants
  const chatVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const messageVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.3, type: "spring", stiffness: 500 } 
    },
  };

  const sidebarAnimation = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  const buttonAnimation = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-black text-white">
      {/* Chat List Sidebar */}
      <div className="w-full md:w-96 border-r border-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-800 bg-black">
          <h2 className="text-xl font-bold text-green-400">Messages</h2>
          <motion.div 
            className="mt-3 flex items-center gap-2 bg-gray-900 rounded-full p-2"
            whileHover={{ scale: 1.01 }}
          >
            <MdSearch className="w-5 h-5 text-purple-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chats..."
              className="w-full bg-transparent outline-none text-white placeholder-gray-500"
            />
          </motion.div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-2">
          {chatListLoading ? (
            <div className="flex justify-center p-4">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <p className="text-purple-300">Loading chats...</p>
              </motion.div>
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
                  selectedChat?.id === chat.id ? "bg-gray-800 border border-green-500" : "hover:bg-gray-900"
                }`}
                onClick={() => setSelectedChat(chat)}
                variants={sidebarAnimation}
                whileHover="hover"
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="w-12 h-12 rounded-full bg-purple-900 flex items-center justify-center overflow-hidden">
                  {chat.avatar ? (
                    <img src={chat.avatar} alt={chat.username} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-lg font-bold uppercase text-white">
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
                  <motion.span 
                    className="bg-green-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {chat.unread}
                  </motion.span>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-gray-900">
        <AnimatePresence mode="wait">
          {selectedChat ? (
            <motion.div
              key={selectedChat.id}
              variants={chatVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-1 flex flex-col"
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-800 bg-black flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-purple-900 flex items-center justify-center cursor-pointer"
                    onClick={() => setSelectedChat(null)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {selectedChat.avatar ? (
                      <img 
                        src={selectedChat.avatar} 
                        alt={selectedChat.username} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="font-bold uppercase text-white">
                        {selectedChat.username[0]}
                      </span>
                    )}
                  </motion.div>
                  <span className="font-semibold text-green-400">{selectedChat.username}</span>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    className="p-2 rounded-full hover:bg-gray-800 text-purple-400"
                    onClick={startVideoCall}
                    aria-label="Start video call"
                    variants={buttonAnimation}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <IoVideocam className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    className="p-2 rounded-full hover:bg-gray-800 text-purple-400"
                    onClick={startVoiceCall}
                    aria-label="Start voice call"
                    variants={buttonAnimation}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <IoCall className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Messages */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-3"
              >
                {messages.length === 0 ? (
                  <motion.div 
                    className="flex items-center justify-center h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-purple-300">
                      Start a conversation with {selectedChat.username}
                    </p>
                  </motion.div>
                ) : (
                  <AnimatePresence>
                    {messages.map((msg, index) => (
                      <motion.div
                        key={msg.id || `${msg.timestamp}-${index}`}
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
                              ? "bg-green-600"
                              : "bg-purple-900"
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
                className="p-4 border-t border-gray-800"
              >
                <div className="flex items-center gap-2">
                  <motion.input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-3 rounded-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                    aria-label="Type your message"
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <motion.button
                    type="submit"
                    className={`p-3 rounded-full ${
                      newMessage.trim() ? "bg-green-600 hover:bg-green-700" : "bg-gray-700"
                    } transition-colors`}
                    disabled={!newMessage.trim()}
                    aria-label="Send message"
                    variants={buttonAnimation}
                    whileHover={newMessage.trim() ? "hover" : {}}
                    whileTap={newMessage.trim() ? "tap" : {}}
                  >
                    <MdSend className="w-5 h-5" />
                  </motion.button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              className="flex-1 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center p-6">
                <motion.h3 
                  className="text-xl font-semibold text-green-400 mb-2"
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Select a chat
                </motion.h3>
                <motion.p 
                  className="text-purple-300"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Choose an existing conversation or start a new one
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Messages;