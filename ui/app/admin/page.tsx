"use client";

import ResponsiveDrawer, { ListItem } from "@/components/SideBar/start";
import { HomeIcon, InfoIcon } from "lucide-react";
import { useState } from "react";
const listItems: ListItem[] = [
    { title: 'Book', link: '/book' },
    { title: 'User', link: '/user' },
    
  ];
export default function Page() {

    return <ResponsiveDrawer items={listItems}  />
}