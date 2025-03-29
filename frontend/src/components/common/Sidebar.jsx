import { MdHomeFilled, MdWork, MdList, MdGroups, MdMonetizationOn, MdShoppingBag } from "react-icons/md";
import { IoNotifications, IoRocket } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Sidebar = () => {
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
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });
  
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  return (
    <div className='md:w-64 w-20'>
      <div className='sticky top-0 left-0 h-screen flex flex-col border-r border-gray-800 bg-black/95 backdrop-blur-sm'>
        {/* Profile Section - Top */}
        {authUser && (
          <Link
            to={`/profile/${authUser.username}`}
            className='group p-4 md:py-5 md:px-4 hover:bg-purple-900/10 transition-all duration-300'
          >
            <div className='flex items-center justify-center md:justify-start gap-3'>
              <div className='relative w-10 h-10 md:w-12 md:h-12'>
                <div className='absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 opacity-80'></div>
                <img 
                  src={authUser?.profileImg || "/avatar-placeholder.png"} 
                  alt="Profile" 
                  className='relative w-full h-full rounded-full object-cover border border-gray-700'
                />
              </div>
              <div className='hidden md:block'>
                <p className='text-sm font-semibold text-white line-clamp-1'>{authUser?.fullName}</p>
                <p className='text-xs text-gray-400'>@{authUser?.username}</p>
                <div className='flex gap-3 mt-1'>
                  <span className='text-xs text-gray-300'>
                    <span className='font-medium text-purple-400'>{authUser?.following?.length || 0}</span> Following
                  </span>
                  <span className='text-xs text-gray-300'>
                    <span className='font-medium text-purple-400'>{authUser?.followers?.length || 0}</span> Followers
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Navigation Menu */}
        <div className='flex-1 overflow-y-auto px-2 py-2 scrollbar-hide'>
          <ul className='flex flex-col gap-1'>
            {[
              { icon: <MdHomeFilled className='w-5 h-5' />, text: "Home", path: "/" },
              { icon: <IoNotifications className='w-5 h-5' />, text: "Notifications", path: "/notifications" },
              { icon: <MdWork className='w-5 h-5' />, text: "Jobs", path: "/jobs" },
              { icon: <MdList className='w-5 h-5' />, text: "Lists", path: "/lists" },
              { icon: <MdMonetizationOn className='w-5 h-5' />, text: "Monetization", path: "/monetization" },
              { icon: <MdShoppingBag className='w-5 h-5' />, text: "Purchases", path: "/purchases" },
              { icon: <MdGroups className='w-5 h-5' />, text: "Communities", path: "/communities" },
              { icon: <IoRocket className='w-5 h-5' />, text: "Space", path: "/space" },
              { icon: <FaUser className='w-5 h-5' />, text: "Profile", path: `/profile/${authUser?.username}` },
            ].map((item) => (
              <li key={item.text}>
                <Link
                  to={item.path}
                  className='flex items-center justify-center md:justify-start gap-3 p-3 rounded-xl hover:bg-purple-900/20 transition-all duration-200 group'
                >
                  <span className='text-gray-300 group-hover:text-purple-400'>{item.icon}</span>
                  <span className='hidden md:block text-gray-300 group-hover:text-purple-400 text-sm font-medium'>
                    {item.text}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout Button - Bottom */}
        <div className='p-3 border-t border-gray-800/50'>
          <button
            onClick={() => logout()}
            className='flex items-center justify-center md:justify-start gap-3 w-full p-3 rounded-xl hover:bg-red-900/20 transition-all duration-200 group'
          >
            <BiLogOut className='w-5 h-5 text-gray-400 group-hover:text-red-400' />
            <span className='hidden md:block text-gray-400 group-hover:text-red-400 text-sm font-medium'>
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;