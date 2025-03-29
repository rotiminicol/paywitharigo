import { MdHomeFilled, MdWork, MdList, MdGroups, MdMonetizationOn, MdShoppingBag, MdSearch } from "react-icons/md";
import { IoNotifications, IoRocket } from "react-icons/io5";
import { FaUser, FaHeart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        throw new Error(error);
      }
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

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const navigationItems = [
    { icon: <MdHomeFilled className="w-6 h-6" />, text: "Home", path: "/" },
    { icon: <MdSearch className="w-6 h-6" />, text: "Search", path: "/search" },
    { icon: <IoNotifications className="w-6 h-6" />, text: "Notifications", path: "/notifications" },
    { icon: <MdWork className="w-6 h-6" />, text: "Jobs", path: "/jobs" },
    { icon: <MdList className="w-6 h-6" />, text: "Lists", path: "/lists" },
    { icon: <MdMonetizationOn className="w-6 h-6" />, text: "Monetization", path: "/monetization" },
    { icon: <MdShoppingBag className="w-6 h-6" />, text: "Purchases", path: "/purchases" },
    { icon: <MdGroups className="w-6 h-6" />, text: "Communities", path: "/communities" },
    { icon: <IoRocket className="w-6 h-6" />, text: "Space", path: "/space" },
    { icon: <FaHeart className="w-6 h-6" />, text: "Miamour", path: "/miamour" },
    { icon: <FaUser className="w-6 h-6" />, text: "Profile", path: `/profile/${authUser?.username}` },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20"
      >
        <div className={`w-6 h-5 flex items-center justify-center relative transform transition-all duration-300 ${isMobileOpen ? 'rotate-90' : ''}`}>
          <span className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ${isMobileOpen ? 'rotate-45 top-2.5' : 'top-0.5'}`}></span>
          <span className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ${isMobileOpen ? 'opacity-0' : 'opacity-100'} top-2.5`}></span>
          <span className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ${isMobileOpen ? '-rotate-45 top-2.5' : 'top-4.5'}`}></span>
        </div>
      </button>

      <div className={`fixed md:relative inset-0 md:inset-auto z-40 transform transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="md:w-64 w-72 h-full">
          <div className="h-screen flex flex-col border-r border-gray-800 bg-black/95 backdrop-blur-sm relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 -left-32 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 -right-32 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl"></div>
            </div>

            {/* Profile Section */}
            {authUser && (
              <Link
                to={`/profile/${authUser.username}`}
                className="group p-5 hover:bg-purple-900/20 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/0 via-purple-900/0 to-purple-900/0 group-hover:from-purple-900/0 group-hover:via-purple-900/20 group-hover:to-purple-900/0 transition-all duration-500"></div>
                <div className="flex items-center gap-4 relative">
                  <div className="relative w-12 h-12 flex-shrink-0 group-hover:scale-105 transition-all duration-300">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 opacity-80 group-hover:opacity-100 animate-pulse-slow"></div>
                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-purple-500/50 group-hover:border-purple-400 transition-all duration-300">
                      <img 
                        src={authUser?.profileImg || "/avatar-placeholder.png"} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/0 to-pink-600/0 group-hover:from-purple-500/20 group-hover:to-pink-600/20 transition-all duration-300"></div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-white line-clamp-1 group-hover:text-purple-300 transition-colors duration-300">
                      {authUser?.fullName}
                    </p>
                    <p className="text-sm text-gray-400 group-hover:text-purple-400 transition-colors duration-300 truncate">
                      @{authUser?.username}
                    </p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-xs text-gray-300 group-hover:text-white transition-colors duration-300">
                        <span className="font-medium text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                          {authUser?.following?.length || 0}
                        </span>{" "}
                        Following
                      </span>
                      <span className="text-xs text-gray-300 group-hover:text-white transition-colors duration-300">
                        <span className="font-medium text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                          {authUser?.followers?.length || 0}
                        </span>{" "}
                        Followers
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Navigation Menu */}
            <div className="flex-1 overflow-y-auto py-4 px-3 scrollbar-hide smooth-scroll" >
              <ul className="flex flex-col gap-2">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.path || 
                                  (item.path.includes('profile') && location.pathname.includes('profile'));
                  return (
                    <li key={item.text}>
                      <Link
                        to={item.path}
                        className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                          isActive 
                            ? "bg-gradient-to-r from-purple-900/60 to-purple-800/40 text-white"
                            : "hover:bg-purple-900/20 text-gray-300 hover:text-white"
                        }`}
                      >
                        <div className={`relative transition-all duration-300 ${isActive ? "text-purple-300" : "text-gray-400 group-hover:text-purple-400"}`}>
                          {item.icon}
                          {isActive && (
                            <span className="absolute -left-1 -top-1 w-8 h-8 bg-purple-500/20 rounded-full blur-md animate-pulse-slow"></span>
                          )}
                        </div>
                        <span className={`text-base font-medium transition-all duration-300 ${
                          isActive ? "text-white" : "text-gray-300"
                        }`}>
                          {item.text}
                        </span>
                        {isActive && (
                          <span className="absolute right-2 w-1.5 h-8 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full"></span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-800/50">
              <button
                onClick={() => logout()}
                className="flex items-center gap-4 w-full p-3 rounded-xl hover:bg-red-900/20 transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative w-6 h-6 flex items-center justify-center">
                  <BiLogOut className="w-6 h-6 text-gray-400 group-hover:text-red-400 transition-colors duration-300" />
                  <span className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 rounded-full transition-colors duration-300"></span>
                </span>
                <span className="text-gray-400 group-hover:text-red-400 text-base font-medium transition-colors duration-300">
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;