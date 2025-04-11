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
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
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
                  </div>
                </div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;