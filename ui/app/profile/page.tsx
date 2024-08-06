"use client";
import React from "react";
import { useEffect } from "react";
import { useUserStore } from "@/store/user-store";
import Image from "next/image";

export default function Page() {

    const { profilePicture, firstName, lastName, email, phoneNumber, roles, getProfile } = useUserStore();

    useEffect(() => {
        const fetchUserProfile = async () => {
            await getProfile();
        }
        fetchUserProfile();
    }, [])


    return (
        <div className="w-screen h-screen relative overflow-hidden text-center text-white text-2xl container  ">
            <div className="mt-10   mx-auto">
                <div className="flex gap-8 text-center items-center justify-center ">
                <Image
                    src="/profile_placeholder.png"
                    width={200}
                    height={200}
                    alt="profile image" />
                    <h1 className="text-white text-4xl">{firstName} {lastName}</h1>
                    
                </div>
                <p> Email : {email}</p>

                
            </div>


        </div>
    );
}