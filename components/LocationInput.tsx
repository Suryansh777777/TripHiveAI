import React from "react";
import { motion } from "framer-motion";
import { LocationInputProps } from "../types";

const LocationInput: React.FC<LocationInputProps> = ({
  title,
  location,
  suggestions,
  onTitleChange,
  onLocationChange,
  onSuggestionClick,
  onAddMarker,
  onClose,
}) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-md w-full mx-auto rounded-2xl p-8 shadow-input bg-white dark:bg-black relative">
        <div
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer dark:text-neutral-300 dark:hover:text-neutral-100"
        >
          ✕
        </div>
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 mb-4">
          Add Location
        </h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-neutral-800 dark:text-neutral-200"
            >
              Title
            </label>
            <motion.div className="p-[2px] rounded-lg transition duration-300 group/input">
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                placeholder="Enter title"
                onChange={onTitleChange}
                className="flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400"
              />
              {/* <input
                type="text"
                value={title}
                name="title"
                placeholder="Title"
                className="p-2 mb-2 border border-gray-300 rounded w-full text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={onTitleChange}
              /> */}
            </motion.div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="location"
              className="text-sm font-medium text-neutral-800 dark:text-neutral-200"
            >
              Location
            </label>
            <motion.div className="p-[2px] rounded-lg transition duration-300 group/input">
              <input
                type="text"
                id="location"
                value={location}
                name="location"
                onChange={onLocationChange}
                placeholder="Enter location"
                className="flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400"
              />
            </motion.div>
            {suggestions.length > 0 && (
              <motion.ul
                className="absolute z-20 bg-white  dark:bg-zinc-800 border border-neutral-300 dark:border-neutral-700 rounded w-96 max-h-40 overflow-y-hidden shadow-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-neutral-100 dark:hover:bg-zinc-700 cursor-pointer text-neutral-800 dark:text-neutral-200"
                    onClick={() => onSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </motion.ul>
            )}
          </div>

          <motion.button
            onClick={onAddMarker}
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Marker
            <BottomGradient />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default LocationInput;
