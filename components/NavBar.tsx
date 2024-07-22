"use client";

import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  TripIcon,
  CalendarIcon,
  DayIcon,
  MapIcon,
  TimeIcon,
  DownIcon,
} from "./Icons/Icons";

const NavItem: React.FC<{
  href: string;
  text: string;
  icon: React.ReactNode;
}> = ({ href, text, icon }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} passHref legacyBehavior>
      <motion.a
        className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
          isActive
            ? "bg-blue-100 text-blue-600"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {icon}
        <span>{text}</span>
      </motion.a>
    </Link>
  );
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { id: "Trip", icon: <TripIcon /> },
    { id: "Overview", icon: <CalendarIcon /> },
    { id: "Day", icon: <DayIcon /> },
    { id: "Map", icon: <MapIcon /> },
    { id: "Budget", icon: <TimeIcon /> },
  ];

  return (
    <motion.nav className="fixed top-0 left-0 right-0 bg-white shadow-md rounded-b-lg px-4 py-3 z-50">
      <div className="flex items-center justify-between">
        <Image
          src="/logo.png"
          width={180}
          height={180}
          alt="Logo"
          className="w-32 md:w-auto"
        />

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-4 bg-white px-3 py-2 rounded-full shadow-xl shadow-slate-300 border-2">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              href={`/${item.id.toLowerCase()}`}
              text={item.id}
              icon={item.icon}
            />
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <motion.button
            className="px-3 py-2 bg-white rounded-xl text-black transition-colors border-2 border-gray-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Save
          </motion.button>

          <motion.div
            className="relative w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Image src="/image.png" width={20} height={20} alt="Profile" />
          </motion.div>

          <motion.button
            className="text-gray-600 hover:text-gray-800"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <DownIcon />
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden mt-4 space-y-2"
        >
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              href={`/${item.id.toLowerCase()}`}
              text={item.id}
              icon={item.icon}
            />
          ))}
          <motion.button
            className="w-full px-3 py-2 bg-white rounded-xl text-black transition-colors border-2 border-gray-300 mt-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Save
          </motion.button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
