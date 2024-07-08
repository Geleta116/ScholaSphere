"use client";

import React from "react";
import { FloatingNav } from "@/components/NavBar/FloatingNavBar";
import { IconHome, IconBook, IconUser, IconFileDescription, IconBrandYoutube } from "@tabler/icons-react";
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
      icon: <IconBook className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Video",
      link: "/video",
      icon: (
        <IconBrandYoutube className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Exams",
      link: "/exams",
      icon: (
        <IconFileDescription className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  return <FloatingNav navItems={navItems} />;
};

export default NavBar;
