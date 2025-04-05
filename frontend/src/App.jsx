import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";
import JobPage from "./pages/Job";
import ListsPage from "./pages/List";
import MonetizationPage from "./pages/Monetize";
import PurchasesPage from "./pages/Purchase";
import CommunitiesPage from "./pages/Communities";
import SpacePage from "./pages/Space";
import Search from "./pages/Search";
import Miamour from "./pages/Miamour";
import Verification from "./pages/Verification";
import LandingPage from "./pages/LandingPage";
import Messages from "./pages/Messages"

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("authUser is here:", data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-black">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-black to-purple-900">
      {authUser && <Sidebar />}
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/verification" />} />
          <Route path="/verification" element={authUser ? <Verification /> : <Navigate to="/" />} />
          <Route
            path="/notifications"
            element={authUser ? <NotificationPage /> : <Navigate to="/login" />}
          />
           <Route
            path="/messages"
            element={authUser ? <Messages /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:username"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/jobs"
            element={authUser ? <JobPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/lists"
            element={authUser ? <ListsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/monetization"
            element={authUser ? <MonetizationPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/purchases"
            element={authUser ? <PurchasesPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/communities"
            element={authUser ? <CommunitiesPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/space"
            element={authUser ? <SpacePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/search"
            element={authUser ? <Search /> : <Navigate to="/login" />}
          />
          <Route
            path="/miamour"
            element={authUser ? <Miamour /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
      {authUser && <RightPanel />}
      <Toaster />
    </div>
  );
}

export default App;