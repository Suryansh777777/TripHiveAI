import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { BoroughCardProps } from "../types";
const BoroughCard: React.FC<BoroughCardProps> = ({
  borough,
  index,
  onCardClick,
}) => {
  const radius = 100;
  const [visible, setVisible] = React.useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className="relative p-px overflow-hidden rounded-xl bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800 group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onClick={onCardClick}
    >
      <motion.div
        className="relative p-4 bg-white dark:bg-black rounded-xl xl:w-96 overflow-hidden"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${
                visible ? radius + "px" : "0px"
              } circle at ${mouseX}px ${mouseY}px,
              var(--blue-500),
              transparent 80%
            )
          `,
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
            {borough.name}
          </h3>
          <span className="border-4 border-indigo-600 bg-gradient-to-br from-indigo-400 to-indigo-800  text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
            {index + 1}
          </span>
        </div>
        <div className="text-neutral-600 dark:text-neutral-400">
          {borough.location}
        </div>
        <div className="mt-4 flex justify-between items-center text-sm">
          <span className="text-neutral-500 dark:text-neutral-400">
            Longitude: {borough.lngLat[0].toFixed(4)}
          </span>
          <span className="text-neutral-500 dark:text-neutral-400">
            Latitude: {borough.lngLat[1].toFixed(4)}
          </span>
        </div>
        <BottomGradient />
      </motion.div>
    </motion.div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default BoroughCard;
