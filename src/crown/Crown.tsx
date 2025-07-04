import BusinessLoanApplication from "./components/BusinessLoanApplication";
import Navbar2 from "./Navbar";
import crownPage from "../crown/assets/crown-page.svg";
import VisionMissionComponent from "./components/VisionMission";
import SocialContacts from "./components/SocialContacts";
import FooterComponent from "./components/FooterComponent";
import { Divider } from "@mui/material";
import FooterDisclaimer from "./components/FooterDisclaimer";

function Crown() {
  return (
    <div className="bg-[#EDEDED] ">
      <Navbar2 />
      <div className="relative z-10 mt-15 px-20 mx-auto h-[700px]">
        <div className="flex justify-between gap-50">
          <div className="w-2/3">
            <BusinessLoanApplication />
          </div>
          <div className="w-1/3">
            <VisionMissionComponent />
          </div>
        </div>
      </div>
      <img
        src={crownPage}
        alt=""
        className="absolute bottom-[-100px] left-0 z-0"
      />
      <div className="w-full bg-[#38AD93] py-10">
        <SocialContacts />
      </div>
      <div>
        <FooterComponent />
      </div>
      <Divider sx={{ borderColor: "yellow-500" }} />
      <div>
        <FooterDisclaimer />
      </div>
    </div>
  );
}

export default Crown;
