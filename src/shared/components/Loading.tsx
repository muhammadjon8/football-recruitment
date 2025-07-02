import { motion } from "framer-motion";
import FootballIcon from "../../assets/football.svg";

export const FootballLoader = () => (
  <div className="flex justify-center items-center h-screen bg-white">
    <motion.img
      src={FootballIcon}
      alt="Loading..."
      className="w-16 h-16"
      animate={{
        y: [0, -20, 0], // bounce
        rotate: [0, 360], // spin
      }}
      transition={{
        y: { repeat: Infinity, duration: 0.6, ease: "easeInOut" },
        rotate: { repeat: Infinity, duration: 1.2, ease: "linear" },
      }}
    />
  </div>
);
