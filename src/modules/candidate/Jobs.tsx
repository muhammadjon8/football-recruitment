import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const jobData = [
  { title: "Scout Assistant", club: "FC Academy" },
  { title: "Video Analyst", club: "United Youth" },
  { title: "Technical Director", club: "Premier SC" },
  { title: "Team Administrator", club: "Lions FC" },
  { title: "Sports Psychologist", club: "Galaxy FC" },
  { title: "Recruitment Manager", club: "City Stars" },
  { title: "Fitness Coach", club: "Fit United" },
  { title: "Goalkeeping Coach", club: "Red Warriors" },
  { title: "Nutrition Expert", club: "Powerhouse FC" },
  { title: "Medical Assistant", club: "White Eagles" },
];

const ITEMS_VISIBLE = 6;
const SCROLL_COUNT = 2;

export default function JobTicker() {
  const [visibleJobs, setVisibleJobs] = useState(
    jobData.slice(0, ITEMS_VISIBLE)
  );
  const [queueIndex, setQueueIndex] = useState(ITEMS_VISIBLE);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleJobs((prev) => {
        const newList = [...prev.slice(SCROLL_COUNT)];
        const nextItems: any[] = [];

        for (let i = 0; i < SCROLL_COUNT; i++) {
          nextItems.push(jobData[(queueIndex + i) % jobData.length]);
        }

        setQueueIndex(
          (prevIndex) => (prevIndex + SCROLL_COUNT) % jobData.length
        );
        return [...newList, ...nextItems];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [queueIndex]);

  return (
    <div className="overflow-hidden h-72 relative w-full">
      <motion.div
        key={queueIndex}
        initial={{ y: 10 }}
        animate={{ y: -85 }}
        exit={{ y: -80 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-2 grid-rows-3 gap-4"
      >
        {visibleJobs.map((job, i) => (
          <div key={i} className="bg-gray-800 text-white p-4 rounded-lg shadow">
            <h4 className="text-lg font-semibold">{job.title}</h4>
            <p className="text-sm opacity-70">{job.club}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
