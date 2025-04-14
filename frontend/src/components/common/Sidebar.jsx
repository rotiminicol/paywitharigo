import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  MdPayment,
  MdSchool,
  MdTrendingUp,
  MdCreditCard,
  MdSettings,
  MdDashboard,
} from 'react-icons/md';
import { FaMoneyBillWave, FaUniversity } from 'react-icons/fa';
import { BiLogOut, BiTransfer, BiHistory } from 'react-icons/bi';
import { BsGlobe, BsPiggyBank, BsShieldLock } from 'react-icons/bs';

const Sidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      toast.success('Logged out successfully');
    },
    onError: () => {
      toast.error('Logout failed');
    },
  });

  const { data: authUser } = useQuery({ queryKey: ['authUser'] });

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const navigationGroups = [
    {
      title: 'Overview',
      items: [
        { icon: <MdDashboard className="w-6 h-6" />, text: 'Dashboard', path: '/dashboard' },
        { icon: <BiHistory className="w-6 h-6" />, text: 'Transaction History', path: '/transaction-history' },
      ],
    },
    {
      title: 'Payments',
      items: [
        { icon: <BiTransfer className="w-6 h-6" />, text: 'Transfers', path: '/transfers' },
        { icon: <MdPayment className="w-6 h-6" />, text: 'Pay Bills', path: '/payments' },
        { icon: <MdSchool className="w-6 h-6" />, text: 'School Fees', path: '/school-fees' },
        { icon: <BsGlobe className="w-6 h-6" />, text: 'International', path: '/international' },
      ],
    },
    {
      title: 'Financial Services',
      items: [
        { icon: <FaMoneyBillWave className="w-6 h-6" />, text: 'Loans', path: '/loans' },
        { icon: <BsPiggyBank className="w-6 h-6" />, text: 'Savings', path: '/savings' },
        { icon: <MdTrendingUp className="w-6 h-6" />, text: 'Investments', path: '/investments' },
        { icon: <MdCreditCard className="w-6 h-6" />, text: 'Cards', path: '/cards' },
      ],
    },
    {
      title: 'Account',
      items: [
        { icon: <BsShieldLock className="w-6 h-6" />, text: 'Security', path: '/security' },
        { icon: <MdSettings className="w-6 h-6" />, text: 'Settings', path: '/settings' },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/30"
      >
        <div
          className={`w-7 h-6 flex items-center justify-center relative transform transition-all duration-300 ease-in-out ${
            isMobileOpen ? 'rotate-90' : ''
          }`}
        >
          <span
            className={`absolute h-0.5 w-7 bg-white transform transition-all duration-300 ease-in-out ${
              isMobileOpen ? 'rotate-45 top-3' : 'top-0.5'
            }`}
          ></span>
          <span
            className={`absolute h-0.5 w-7 bg-white transform transition-all duration-300 ease-in-out ${
              isMobileOpen ? 'opacity-0' : 'opacity-100'
            } top-3`}
          ></span>
          <span
            className={`absolute h-0.5 w-7 bg-white transform transition-all duration-300 ease-in-out ${
              isMobileOpen ? '-rotate-45 top-3' : 'top-5.5'
            }`}
          ></span>
        </div>
      </button>

      <div
        className={`fixed md:relative inset-0 md:inset-auto z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="md:w-96 w-80 h-full">
          <div className="h-screen flex flex-col border-r border-blue-100/20 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 relative overflow-hidden">
            {/* Bank Logo */}
            <div className="py-8 px-6 flex items-center gap-4 relative bg-white/10 backdrop-blur-sm mb-4">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg shadow-blue-700/30">
                <FaUniversity className="w-8 h-8 text-blue-600 relative z-10" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-wide">ARIGO PAY</h1>
                <p className="text-sm text-blue-100 font-medium tracking-wider uppercase">
                  Bank with Arigo
                </p>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 overflow-y-auto scrollbar-hide smooth-scroll px-6 pb-4">
              {navigationGroups.map((group, index) => (
                <div key={index} className="mb-6">
                  <div className="px-4 py-3">
                    <h3 className="text-sm font-bold text-blue-100 uppercase tracking-wider">
                      {group.title}
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {group.items.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <li key={item.text}>
                          <Link
                            to={item.path}
                            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 relative overflow-hidden ${
                              isActive
                                ? 'bg-white/20 text-white font-medium shadow-sm'
                                : 'hover:bg-white/10 text-white/80 hover:text-white'
                            }`}
                          >
                            <div
                              className={`relative transition-all duration-300 ${
                                isActive ? 'text-white' : 'text-white/70'
                              }`}
                            >
                              {item.icon}
                            </div>
                            <span className="text-base">{item.text}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Logout Section */}
            <div className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-sm">
              {authUser && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/30">
                      <img
                        src={authUser?.profileImg || '/avatar-placeholder.png'}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white line-clamp-1">
                        {authUser?.fullName}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => logout()}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-300"
                  >
                    <BiLogOut className="w-6 h-6 text-white/70 hover:text-white transition-colors duration-300" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;