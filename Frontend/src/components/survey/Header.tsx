import { LogOut } from "lucide-react";

const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="bg-blue-600 text-white p-4 sm:p-8 flex justify-between items-center shadow-md">
      <h1 className="text-4xl font-bold">
        {title}
      </h1>
      <button
        className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md transition-all cursor-pointer"
        title="Logout"
      >
        <span>Logout</span>
        <LogOut size={18} />
      </button>
    </div>
  );
};

export default Header;
