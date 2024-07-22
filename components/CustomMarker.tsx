import React from "react";
import { motion } from "framer-motion";

const CustomMarker: React.FC<{ count: number }> = ({ count }) => (
  <motion.div
    className="w-8 h-8 rounded-full border-4 border-indigo-600 bg-gradient-to-br from-indigo-400 to-indigo-800 flex justify-center items-center text-bold text-xl text-white shadow-lg"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    {count}
  </motion.div>
);

export default CustomMarker;
