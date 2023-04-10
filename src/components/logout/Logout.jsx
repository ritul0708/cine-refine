import { auth } from "../../auth/firebase";

const Logout = () => {
  const handleLogout = () => {
    auth.signOut();
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
