"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/util/acternity/cn";
import Link from "next/link";

interface NavItem {
  name: string;
  link: string;
  icon?: JSX.Element;
}

interface FloatingNavProps {
  navItems: NavItem[];
  className?: string;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({
  navItems,
  className,
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true); // Start with visible as true
  const [activeItem, setActiveItem] = useState<string | null>(null); // State to track the active nav item

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is a valid number
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(true); // Always show at the top of the page
      } else {
        setVisible(true); // Show if scrolling up, hide if scrolling down
      }
    }
  });

  const handleClick = (name: string) => {
    setActiveItem(name);
  };

  return (
    <AnimatePresence mode="wait">
      {visible && ( // Only render when visible
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "flex max-w-fit fixed top-4 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
            className
          )}
        >
          {navItems.map((navItem, idx) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              onClick={() => handleClick(navItem.name)}
              className={cn(
                "relative items-center flex space-x-1 px-4 py-2 rounded-full",
                "text-neutral-600 dark:text-neutral-50 dark:hover:text-neutral-300 hover:text-neutral-500"
              )}
            >
              <span
                className={cn(
                  activeItem === navItem.name
                    ? "absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px"
                    : ""
                )}
              />
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-sm">{navItem.name}</span>
            </Link>
          ))}
          <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
            <span>Login</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
