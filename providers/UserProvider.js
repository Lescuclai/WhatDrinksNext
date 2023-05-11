import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ id: user.uid });
      } else {
        setUser({ id: null });
      }
    });
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export const useUserContext = () => useContext(UserContext);

export default UserProvider;
