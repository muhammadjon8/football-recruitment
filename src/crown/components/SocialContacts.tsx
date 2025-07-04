import {
  Email,
  Instagram,
  LinkedIn,
  LocationOn,
  PhoneEnabled,
} from "@mui/icons-material";

function SocialContacts() {
  return (
    <div className="flex justify-between items-center px-20">
      <div className="flex gap-2">
        <PhoneEnabled sx={{ color: "white" }} />
        <p className="text-[#35455A] font-bold">01908039818</p>
      </div>
      <div className="flex gap-2">
        <Email sx={{ color: "white" }} />
        <p className="text-[#35455A] font-bold">
          info@crownbusinessfinance.co.uk
        </p>
      </div>
      <div className="flex gap-2">
        <LocationOn sx={{ color: "white" }} />
        <p className="text-[#35455A] font-bold">
          Norfolk House, Silbury Boulevard, Milton Keynes, MK9 2AH
        </p>
      </div>
      <div className="flex gap-2">
        <button className="bg-[#35455A] p-2 rounded-xl">
          <LinkedIn sx={{ color: "white" }} />
        </button>
        <button className="bg-[#35455A] p-2 rounded-xl">
          <Instagram sx={{ color: "white" }} />
        </button>
      </div>
    </div>
  );
}

export default SocialContacts;
