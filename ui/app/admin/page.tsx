"use client";

import Sidebar from '@/components/SideBar/index';
import { useState } from "react";

export default function Page() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // return <></>
    return <><Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/></>
}