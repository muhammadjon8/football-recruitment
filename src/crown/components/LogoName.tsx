import { Box } from "@mui/material";
import logo from "../assets/crown-logo.svg";

function LogoAndName() {
  return (
    <Box className="flex items-center space-x-2">
      <img src={logo} alt="Logo" className="w-15 h-10" />
      <Box className="flex flex-col">
        <p className="font-bold text-[#35455A] text-3xl font-serif">CROWN</p>
        <p className="text-[#48BFAC] font-serif text-center">Business Finance</p>
      </Box>
    </Box>
  );
}

export default LogoAndName;
