import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import { DayNavigationProps } from "../types";
const DayNavigation: React.FC<DayNavigationProps> = ({
  currentDay,
  onDayChange,
}) => (
  <div className="flex items-center justify-between mb-4 xl:px-4 py-2 w-1/2 rounded-xl  ">
    <motion.button
      onClick={() => onDayChange("left")}
      disabled={currentDay === 1}
      className="p-2 rounded-full bg-white shadow hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <ChevronLeftIcon className="h-3 w-3 xl:h-6 xl:w-6 text-gray-600" />
    </motion.button>
    <h2 className="text-2xl font-bold text-gray-800">Day {currentDay}</h2>
    <motion.button
      onClick={() => onDayChange("right")}
      disabled={currentDay === 2}
      className="p-2 rounded-full bg-white shadow hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <ChevronRightIcon className="h-4 w-4 xl:h-6 xl:w-6 text-gray-600" />
    </motion.button>
  </div>
);

export default DayNavigation;
