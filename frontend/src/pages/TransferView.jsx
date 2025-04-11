import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from "./Modals";

const TransfersView = ({ setAccountDetails }) => {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferAmount, setTransferAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleTransfer = () => {
    const amount = parseFloat(transferAmount);
    if (!isNaN(amount) && amount > 0 && recipient) {
      setAccountDetails((prev) => ({
        ...prev,
        balance: prev.balance - amount,
      }));
      setTransferAmount('');
      setRecipient('');
      setShowTransferModal(false);
      alert(`Transferred ₦${amount} to ${recipient}`);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Transfers</h2>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowTransferModal(true)}
        className="w-full p-3 bg-blue-600 text-white rounded-md"
      >
        New Transfer
      </motion.button>

      {showTransferModal && (
        <Modal onClose={() => setShowTransferModal(false)}>
          <h2 className="text-xl font-semibold mb-4">New Transfer</h2>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Recipient Name or Account Number"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          <input
            type="number"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTransfer}
            className="w-full p-3 bg-blue-600 text-white rounded-md"
          >
            Send Money
          </motion.button>
        </Modal>
      )}
    </motion.div>
  );
};

export default TransfersView;