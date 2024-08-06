"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUserStore } from "@/store/user-store";

const Page: React.FC = () => {
    const {
        profilePicture,
        firstName,
        lastName,
        email,
        phoneNumber,
        roles,
        getProfile,
        userName,
        description
    } = useUserStore();

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                await getProfile();
            } catch (err) {
                setError("Failed to load profile. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, [getProfile]);

    if (loading) return <div className="w-screen h-screen flex items-center justify-center text-white text-2xl">Loading...</div>;

    if (error) return <div className="w-screen h-screen flex items-center justify-center text-red-500 text-2xl">{error}</div>;

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-black text-white text-lg">
            <div className="text-center  px-4 py-6 bg-black rounded-lg shadow-lg h-screen ">
                <div className="mb-6 flex flex-col items-center">
                    <Image
                        src={profilePicture || "/profile_placeholder.png"}
                        width={200}
                        height={200}
                        alt="Profile image"
                        className="mb-4 rounded-full border-2 border-purple-600"
                    />
                    <h1 className="text-3xl font-semibold">{firstName} {lastName}</h1>
                </div>
                <p className="text-xl mb-2">Email: <span className="font-light">{email}</span></p>
                <p className="text-xl mb-2">Username: <span className="font-light">{userName}</span></p>
                <p className="text-xl mb-2">Description: <span className="font-light">{description}</span></p>
                <p className="text-xl">Phone Number: <span className="font-light">{phoneNumber}</span></p>
            </div>
        </div>
    );
};

export default Page;
