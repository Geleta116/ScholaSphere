import { create } from "zustand";
import { DeleteUser, GetAllUser, GetProfile, PromoteToAdmin, UpdateProfile } from "@/util/api/user-api";
import { User } from "@/model/User";

interface UserStore {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    phoneNumber?: string;
    profilePicture?: string;
    description: string;
    email: string;
    roles: string[];
    allUsers: User[];
    bookError?: string;
    getProfile: () => Promise<void>;
    getAllUser: () => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
    updateProfile: (id: string, user: User) => Promise<void>;
    promoteToAdmin: (id: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    id: "",
    firstName: "",
    lastName: "",
    userName: "",
    phoneNumber: undefined,
    profilePicture: undefined,
    description: "",
    email: "",
    roles: [],
    allUsers: [],
    bookError: undefined,
    getProfile: async () => {
        try {
            const user: User = await GetProfile();
            set({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                phoneNumber: user.phoneNumber,
                profilePicture: user.profilePicture,
                email: user.email,
                roles: user.roles,
                bookError: undefined,
                description: user.description
            });
        } catch (error) {
            set({ bookError: (error as Error).message });
            throw error;
        }
    },
    getAllUser: async () => {
        try {
            const users: User[] = await GetAllUser();
            set({ allUsers: users, bookError: undefined });
        } catch (error) {
            set({ bookError: (error as Error).message });
            throw error;
        }
    },
    deleteUser: async (id: string) => {
        try {
            await DeleteUser(id);
            set((state) => ({
                allUsers: state.allUsers.filter(user => user.id !== id),
                bookError: undefined
            }));
        } catch (error) {
            set({ bookError: (error as Error).message });
            throw error;
        }
    },
    updateProfile: async (id: string, user: User) => {
        try {
            await UpdateProfile(id, user);
            set({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                phoneNumber: user.phoneNumber,
                profilePicture: user.profilePicture,
                email: user.email,
                roles: user.roles,
                bookError: undefined
            });
        } catch (error) {
            set({ bookError: (error as Error).message });
            throw error;
        }
    },
    promoteToAdmin: async (id: string) => {
        try {
            await PromoteToAdmin(id);
            set({ bookError: undefined });
        } catch (error) {
            set({ bookError: (error as Error).message });
            throw error;
        }
    }
}));
