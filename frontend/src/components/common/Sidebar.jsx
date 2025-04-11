<<<<<<< HEAD
import { 
  MdPayment, 
  MdSchool, 
  MdTrendingUp, 
  MdCreditCard, 
  MdSettings, 
  MdDashboard,
  MdOutlineAttachMoney
} from "react-icons/md";
import { FaMoneyBillWave, FaUniversity, FaRegCreditCard } from "react-icons/fa";
import { BiLogOut, BiTransfer, BiHistory } from "react-icons/bi";
import { BsGlobe, BsCashCoin, BsPiggyBank, BsShieldLock } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
=======
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  DollarSign,
  Home,
  Send,
  Globe,
  Receipt,
  BookOpen,
  PiggyBank,
  CreditCard,
  BarChart,
  User,
  LogOut,
  Menu,
} from "lucide-react";
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718

const Sidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Logged out successfully");
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

<<<<<<< HEAD
  const navigationGroups = [
    {
      title: "Overview",
      items: [
        { icon: <MdDashboard className="w-5 h-5" />, text: "Dashboard", path: "/" },
        { icon: <BiHistory className="w-5 h-5" />, text: "Transaction History", path: "/history" },
      ]
    },
    {
      title: "Payments",
      items: [
        { icon: <BiTransfer className="w-5 h-5" />, text: "Transfers", path: "/transfers" },
        { icon: <MdPayment className="w-5 h-5" />, text: "Pay Bills", path: "/bills" },
        { icon: <MdSchool className="w-5 h-5" />, text: "School Fees", path: "/school-fees" },
        { icon: <BsGlobe className="w-5 h-5" />, text: "International", path: "/international" },
      ]
    },
    {
      title: "Financial Services",
      items: [
        { icon: <FaMoneyBillWave className="w-5 h-5" />, text: "Loans", path: "/loans" },
        { icon: <BsPiggyBank className="w-5 h-5" />, text: "Savings", path: "/savings" },
        { icon: <MdTrendingUp className="w-5 h-5" />, text: "Investments", path: "/investments" },
        { icon: <MdCreditCard className="w-5 h-5" />, text: "Cards", path: "/cards" },
      ]
    },
    {
      title: "Account",
      items: [
        { icon: <BsShieldLock className="w-5 h-5" />, text: "Security", path: "/security" },
        { icon: <MdSettings className="w-5 h-5" />, text: "Settings", path: "/settings" },
      ]
    }
=======
  const navigationItems = [
    { icon: <Home className="w-6 h-6" />, text: "Dashboard", path: "/dashboard" },
    { icon: <Send className="w-6 h-6" />, text: "Transfers", path: "/transfers" },
    { icon: <Globe className="w-6 h-6" />, text: "International", path: "/international-transfers" },
    { icon: <Receipt className="w-6 h-6" />, text: "Bills", path: "/bills" },
    { icon: <BookOpen className="w-6 h-6" />, text: "School Fees", path: "/school-fees" },
    { icon: <PiggyBank className="w-6 h-6" />, text: "Savings", path: "/savings" },
    { icon: <CreditCard className="w-6 h-6" />, text: "Cards", path: "/cards" },
    { icon: <BarChart className="w-6 h-6" />, text: "Investments", path: "/investments" },
    { icon: <User className="w-6 h-6" />, text: "Profile", path: `/profile/${authUser?.username}` },
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
<<<<<<< HEAD
        className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/30"
      >
        <div className={`w-6 h-5 flex items-center justify-center relative transform transition-all duration-300 ease-in-out ${isMobileOpen ? "rotate-90" : ""}`}>
          <span className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${isMobileOpen ? "rotate-45 top-2.5" : "top-0.5"}`}></span>
          <span className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${isMobileOpen ? "opacity-0" : "opacity-100"} top-2.5`}></span>
          <span className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${isMobileOpen ? "-rotate-45 top-2.5" : "top-4.5"}`}></span>
        </div>
      </button>

      <div className={`fixed md:relative inset-0 md:inset-auto z-40 transform transition-transform duration-300 ease-in-out ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="md:w-64 w-72 h-full">
          <div className="h-screen flex flex-col border-r border-blue-100/20 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Bright glowing elements */}
              <div className="absolute top-0 -left-20 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 -right-20 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
              
              {/* Enhanced blue sparks animation */}
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
              <div className="absolute top-3/4 left-1/2 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: "1s"}}></div>
              <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: "1.5s"}}></div>
              <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: "0.7s"}}></div>
              <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: "2s"}}></div>
              
              {/* Geometric patterns */}
              <div className="absolute top-20 right-4 w-20 h-20 border border-white/10 rounded-full"></div>
              <div className="absolute bottom-40 left-6 w-12 h-12 border border-white/10 rounded-full"></div>
              <div className="absolute top-60 left-10 w-16 h-16 border border-white/5 rounded-lg rotate-45"></div>
            </div>

            {/* Bank Logo and Name - Brighter and cleaner */}
            <div className="py-6 px-5 flex items-center gap-3 relative bg-white/10 backdrop-blur-sm mb-2">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg shadow-blue-700/30">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-20"></div>
                <FaUniversity className="w-6 h-6 text-blue-600 relative z-10" />
                <div className="absolute inset-0 bg-blue-400/10 animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-wide">ARIGO PAY</h1>
                <p className="text-xs text-blue-100 font-medium tracking-wider uppercase">Bank with arigo </p>
              </div>
            </div>

            {/* Account Balance Card - New brighter design */}
            {authUser && (
              <div className="mx-4 p-4 bg-white/20 backdrop-blur-md rounded-xl shadow-lg relative overflow-hidden mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-600/10"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-blue-100">Available Balance</span>
                    <Link to="/transactions" className="text-xs text-white hover:text-blue-200 transition-colors underline underline-offset-2">View Details</Link>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">₦{authUser?.balance?.toLocaleString() || "0.00"}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <FaRegCreditCard className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs text-blue-100 truncate">****{authUser?.accountNumber?.slice(-4) || "1234"}</span>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-2 right-2 w-12 h-12 border border-white/10 rounded-full"></div>
                <div className="absolute bottom-2 left-2 w-8 h-8 border border-white/10 rounded-full"></div>
              </div>
            )}

            {/* Quick Actions - Redesigned for better clarity */}
            <div className="mx-4 p-2 bg-white/10 backdrop-blur-sm rounded-xl mb-4 shadow-sm">
              <div className="grid grid-cols-3 gap-1">
                <Link
                  to="/transfers"
                  className="flex flex-col items-center justify-center gap-1 py-3 rounded-lg hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <BiTransfer className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-medium text-white">Send</span>
                </Link>
                <Link
                  to="/bills"
                  className="flex flex-col items-center justify-center gap-1 py-3 rounded-lg hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <BsCashCoin className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-medium text-white">Pay</span>
                </Link>
                <Link
                  to="/savings"
                  className="flex flex-col items-center justify-center gap-1 py-3 rounded-lg hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <MdOutlineAttachMoney className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-medium text-white">Save</span>
                </Link>
              </div>
            </div>

            {/* Navigation Menu - Reorganized with categories */}
            <div className="flex-1 overflow-y-auto scrollbar-hide smooth-scroll px-3 pb-3">
              {navigationGroups.map((group, index) => (
                <div key={index} className="mb-4">
                  <div className="px-3 py-2">
                    <h3 className="text-xs font-bold text-blue-100 uppercase tracking-wider">{group.title}</h3>
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
                                ? "bg-white/20 text-white font-medium shadow-sm"
                                : "hover:bg-white/10 text-white/80 hover:text-white"
                            }`}
                          >
                            <div
                              className={`relative transition-all duration-300 ${
                                isActive ? "text-white" : "text-white/70"
                              }`}
                            >
                              {item.icon}
                              {isActive && (
                                <span className="absolute -left-1 -top-1 w-8 h-8 bg-white/30 rounded-full blur-md animate-pulse"></span>
                              )}
                            </div>
                            <span className="text-sm">{item.text}</span>
                            {isActive && (
                              <span className="absolute right-1.5 w-1 h-5 bg-white rounded-full"></span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Profile and Logout Section */}
            <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
              {authUser && (
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30">
                      <img
                        src={authUser?.profileImg || "/avatar-placeholder.png"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-white line-clamp-1">
                        {authUser?.fullName}
                      </p>
                    </div>
=======
        className="md:hidden fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-lg hover:bg-blue-500 transition-all duration-300"
      >
        <Menu
          className={`w-6 h-6 text-white transform transition-transform duration-300 ${
            isMobileOpen ? "rotate-90" : ""
          }`}
        />
      </button>

      <div
        className={`fixed md:relative inset-0 md:inset-auto z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="md:w-64 w-72 h-full">
          <div className="h-screen flex flex-col border-r border-blue-200 bg-white relative overflow-hidden">
            {/* Profile Section */}
            {authUser && (
              <Link
                to={`/profile/${authUser.username}`}
                className="group p-5 hover:bg-blue-50 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 flex-shrink-0 group-hover:scale-105 transition-all duration-300">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 opacity-80 group-hover:opacity-100"></div>
                    <img
                      src={authUser?.profileImg || "/avatar-placeholder.png"}
                      alt="Profile"
                      className="relative w-full h-full rounded-full object-cover border-2 border-blue-500/50 group-hover:border-blue-400 transition-all duration-300"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {authUser?.fullName}
                    </p>
                    <p className="text-sm text-gray-600 group-hover:text-blue-500 transition-colors duration-300 truncate">
                      @{authUser?.username}
                    </p>
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718
                  </div>
                  <button
                    onClick={() => logout()}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-300 group"
                  >
                    <BiLogOut className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
                  </button>
                </div>
<<<<<<< HEAD
              )}
=======
              </Link>
            )}

            {/* Navigation Menu */}
            <div className="flex-1 overflow-y-auto py-4 px-3">
              <ul className="flex flex-col gap-2">
                {navigationItems.map((item) => {
                  const isActive =
                    location.pathname === item.path ||
                    (item.path?.includes("profile") && location.pathname.includes("profile"));
                  return (
                    <li key={item.text}>
                      <Link
                        to={item.path}
                        className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ${
                          isActive
                            ? "bg-blue-100 text-blue-600"
                            : "text-gray-600 hover:bg-blue-50 hover:text-blue-500"
                        }`}
                      >
                        <div
                          className={`transition-colors duration-300 ${
                            isActive ? "text-blue-600" : "text-gray-500 group-hover:text-blue-500"
                          }`}
                        >
                          {item.icon}
                        </div>
                        <span
                          className={`text-base font-medium transition-colors duration-300 ${
                            isActive ? "text-blue-600" : "text-gray-600"
                          }`}
                        >
                          {item.text}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Logout Button */}
            <div className="p-4 border-t border-blue-200">
              <button
                onClick={() => logout()}
                className="flex items-center gap-4 w-full p-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-500 transition-all duration-300"
              >
                <LogOut className="w-6 h-6 text-gray-500 group-hover:text-blue-500 transition-colors duration-300" />
                <span className="text-base font-medium">Logout</span>
              </button>
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;