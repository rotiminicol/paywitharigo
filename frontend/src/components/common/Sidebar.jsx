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
        { icon: <MdDashboard className="w-5 h-5" />, text: 'Dashboard', path: '/dashboard' },
        { icon: <BiHistory className="w-5 h-5" />, text: 'Transaction History', path: '/transactions' },
      ],
    },
    {
      title: 'Payments',
      items: [
        { icon: <BiTransfer className="w-5 h-5" />, text: 'Transfers', path: '/transfers' },
        { icon: <MdPayment className="w-5 h-5" />, text: 'Pay Bills', path: '/payments' },
        { icon: <MdSchool className="w-5 h-5" />, text: 'School Fees', path: '/school-fees' },
        { icon: <BsGlobe className="w-5 h-5" />, text: 'International', path: '/international' },
      ],
    },
    {
      title: 'Financial Services',
      items: [
        { icon: <FaMoneyBillWave className="w-5 h-5" />, text: 'Loans', path: '/loans' },
        { icon: <BsPiggyBank className="w-5 h-5" />, text: 'Savings', path: '/savings' },
        { icon: <MdTrendingUp className="w-5 h-5" />, text: 'Investments', path: '/investments' },
        { icon: <MdCreditCard className="w-5 h-5" />, text: 'Cards', path: '/cards' },
      ],
    },
    {
      title: 'Account',
      items: [
        { icon: <BsShieldLock className="w-5 h-5" />, text: 'Security', path: '/security' },
        { icon: <MdSettings className="w-5 h-5" />, text: 'Settings', path: '/settings' },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/30"
      >
        <div
          className={`w-6 h-5 flex items-center justify-center relative transform transition-all duration-300 ease-in-out ${
            isMobileOpen ? 'rotate-90' : ''
          }`}
        >
          <span
            className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
              isMobileOpen ? 'rotate-45 top-2.5' : 'top-0.5'
            }`}
          ></span>
          <span
            className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
              isMobileOpen ? 'opacity-0' : 'opacity-100'
            } top-2.5`}
          ></span>
          <span
            className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
              isMobileOpen ? '-rotate-45 top-2.5' : 'top-4.5'
            }`}
          ></span>
        </div>
      </button>

      <div
        className={`fixed md:relative inset-0 md:inset-auto z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="md:w-64 w-72 h-full">
          <div className="h-screen flex flex-col border-r border-blue-100/20 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 relative overflow-hidden">
            {/* Bank Logo */}
            <div className="py-6 px-5 flex items-center gap-3 relative bg-white/10 backdrop-blur-sm mb-2">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg shadow-blue-700/30">
                <FaUniversity className="w-6 h-6 text-blue-600 relative z-10" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-wide">ARIGO PAY</h1>
                <p className="text-xs text-blue-100 font-medium tracking-wider uppercase">
                  Bank with Arigo
                </p>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 overflow-y-auto scrollbar-hide smooth-scroll px-3 pb-3">
              {navigationGroups.map((group, index) => (
                <div key={index} className="mb-4">
                  <div className="px-3 py-2">
                    <h3 className="text-xs font-bold text-blue-100 uppercase tracking-wider">
                      {group.title}
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-1">
                    {group.items.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <li key={item.text}>
                          <Link
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 relative overflow-hidden ${
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
                            <span className="text-sm">{item.text}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Logout Section */}
            <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
              {authUser && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30">
                      <img
                        src={authUser?.profileImg || '/avatar-placeholder.png'}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-white line-clamp-1">
                        {authUser?.fullName}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => logout()}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-300"
                  >
                    <BiLogOut className="w-5 h-5 text-white/70 hover:text-white transition-colors duration-300" />
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