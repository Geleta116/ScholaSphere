"use client";

import React from "react";
import { FloatingNav } from "@/components/NavBar/FloatingNavBar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
const NavBar: React.FC = () => {
  const navItems = [
    {
      name: "Home",
      link: "/home",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Book",
      link: "/book",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Video",
      link: "/video",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  return <FloatingNav navItems={navItems} />;
};

export default NavBar;
