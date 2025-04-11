import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './Modals';

const PaymentsView = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [payee, setPayee] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');

  const handlePayment = () => {
    const amount = parseFloat(paymentAmount);
    if (!isNaN(amount) && amount > 0 && payee) {
      alert(`Paid ₦${amount} to ${payee}`);
      setPayee('');
      setPaymentAmount('');
      setShowPaymentModal(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Payments</h2>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowPaymentModal(true)}
        className="w-full p-3 bg-blue-600 text-white rounded-md"
      >
        New Payment
      </motion.button>

      {showPaymentModal && (
        <Modal onClose={() => setShowPaymentModal(false)}>
          <h2 className="text-xl font-semibold mb-4">New Payment</h2>
          <input
            type="text"
            value={payee}
            onChange={(e) => setPayee(e.target.value)}
            placeholder="Payee Name (e.g., Netflix)"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePayment}
            className="w-full p-3 bg-blue-600 text-white rounded-md"
          >
            Make Payment
          </motion.button>
        </Modal>
      )}
    </motion.div>
  );
};

export default PaymentsView;