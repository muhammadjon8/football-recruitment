import { ExpandMore, Login } from "@mui/icons-material";
import LogoName from "./components/LogoName";

function Navbar2() {
  return (
    <div className="py-2 px-20 mx-auto bg-white">
      <div className="flex items-center justify-between">
        <div>
          <LogoName />
        </div>
        <div className="">
          <ul className="flex gap-10 items-center">
            <li className="font-serif text-lg cursor-pointer">
              FINANCE SOLUTION <ExpandMore />
            </li>
            <li className="font-serif text-lg cursor-pointer">
              SECTORS <ExpandMore />
            </li>
            <li className="font-serif text-lg cursor-pointer">ABOUT</li>
            <li className="font-serif text-lg cursor-pointer">CONTACT US</li>
          </ul>
        </div>
        <div className="flex items-center">
          <button className="hover:bg-green-200 px-6 py-2 rounded-full flex items-center gap-2 border-2 border-[#E6E6E6] cursor-pointer font-bold">
            <Login />
            LOGIN
          </button>
          <button className="bg-[#38AD93] text-white px-6 py-2  ml-2 rounded-full cursor-pointer font-bold">
            APPLY TODAY
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar2;
