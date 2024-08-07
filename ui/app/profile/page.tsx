"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUserStore } from "@/store/user-store";
import { useBookStore } from "@/store/book-store";
import BookGrid from "@/components/ResourceCategory/BookGrid";

const Page: React.FC = () => {
    const {
        profilePicture,
        firstName,
        lastName,
        email,
        phoneNumber,
        getProfile,
        userName,
        description
    } = useUserStore();

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { getYourApprovedBooks, getYourUnApprovedBooks, yourApprovedBooks, yourUnApprovedBooks } = useBookStore();

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

        getYourApprovedBooks();
        getYourUnApprovedBooks();
        fetchUserProfile();
    }, [getProfile]);

    if (loading) return <div className="w-screen h-screen flex items-center justify-center text-white text-2xl">Loading...</div>;

    if (error) return <div className="w-screen h-screen flex items-center justify-center text-red-500 text-2xl">{error}</div>;

    return (
        <div className="w-screen h-screen flex flex-col overflow-auto">
            <div className="flex-1 flex flex-col md:flex-row">
                <div className="p-6 rounded-lg shadow-lg backdrop-blur-xl text-white flex flex-col md:w-1/3 lg:w-1/4 md:sticky md:top-0 md:left-0 md:h-screen md:overflow-hidden">
                    <div className="mb-6 flex flex-col items-center mt-20">
                        <Image
                            src={profilePicture || "/profile_placeholder.png"}
                            width={200}
                            height={200}
                            alt="Profile image"
                            className="mb-4 rounded-full border-2 border-purple-600"
                        />
                        <h1 className="text-3xl font-semibold">{firstName} {lastName}</h1>
                    </div>
                    <div className="text-center sm:text-left">
                        <p className="text-md mb-2">Email: <span className="font-light">{email}</span></p>
                        <p className="text-md mb-2">Username: <span className="font-light">{userName}</span></p>
                        <p className="text-md mb-2">Description: <span className="font-light">{description}</span></p>
                        <p className="text-md">Phone Number: <span className="font-light">{phoneNumber}</span></p>
                    </div>
                </div>

                <div className="flex-1 p-6">
                    <div className="mt-20">
                        <p className="text-white text-center text-6xl mb-5">Approved Books</p>
                        <BookGrid books={yourApprovedBooks} />
                        <p className="text-white text-center text-6xl mb-5 mt-10">Unapproved Books</p>
                        <BookGrid books={yourUnApprovedBooks} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
