import { LogIn, LogOut } from "lucide-react";
import { isAdminLoggedIn, isLoggedIn } from "../../helpers/isLoggedIn";
import { StorageKeys } from "../../enums/storageKeys";
import { HeaderProps } from "../../interfaces/survey";
import { UserRoles } from "../../enums/userRoles";
import useNavigation from "../../hooks/useNavigation";
import toast from "react-hot-toast";
import { MESSAGES } from "../../constants/messages";

const Header: React.FC<HeaderProps> = ({ title, role }) => {
  const isUserLoggedIN = isLoggedIn();
  const isAdmLoggedIn = isAdminLoggedIn();
  const { goToLogin, goToHome, goToAdminLogin } = useNavigation();

  const handleButtonClick = () => {
    if (role === UserRoles.USER) {
      if (isUserLoggedIN) {
        localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
        goToHome();
        toast.success(MESSAGES.SUCCESS.LOGOUT_SUCCESS);
      } else {
        goToLogin();
      }
    } else if (role === UserRoles.ADMIN) {
      if (isAdmLoggedIn) {
        localStorage.removeItem(StorageKeys.ADMIN_ACCESS_TOKEN);
        toast.success(MESSAGES.SUCCESS.LOGOUT_SUCCESS);
      }
      goToAdminLogin();
    }
  }

  return (
    <div className="bg-blue-600 text-white p-4 sm:p-8 flex justify-between items-center shadow-md">
      <h1 className="text-4xl font-bold">
        {title}
      </h1>
      <button
        onClick={handleButtonClick}
        className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md transition-all cursor-pointer"
        title="Logout"
      >
        <span>{isUserLoggedIN ? "Logout" : "Log In"}</span>
        {
          isUserLoggedIN ? <LogOut size={18} /> : <LogIn size={18} />}
      </button>
    </div>
  );
};

export default Header;
