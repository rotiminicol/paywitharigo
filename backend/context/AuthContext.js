const AuthContext = React.createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Fetch user data on login
  useEffect(() => {
    // Example: fetch user from API
    setUser({
      id: "123",
      name: "User Name",
      accountNumber: "0123456789",
      balance: 0.0,
      currency: "₦",
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};