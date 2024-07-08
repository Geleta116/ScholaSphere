"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/util/validation/sign-up-schema";
import PrimaryButton from "../Buttons/PrimaryButton";
import z from "zod";
import useAuthStore from "@/store/auth-store";
import { toast } from "react-toastify";

type SignUpFormProps = z.infer<typeof SignUpSchema>;

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormProps>({
    resolver: zodResolver(SignUpSchema),
  });

  const { signup, error } = useAuthStore(); 

  const onSubmit = async (data: SignUpFormProps) => {
    try {
      await signup(data); 
    } catch (e) {
      toast(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 p-4 rounded-lg shadow-2xl w-full max-w-xl"
    >
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <div className="flex-1 mb-4 sm:mb-0">
          <label htmlFor="firstName" className="mb-1 text-white">
            First Name
          </label>
          
          <input
            {...register("firstName")}
            id="firstName"
            placeholder="e.g. John"
            className="border rounded p-2 bg-transparent text-white w-full"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>
        <div className="flex-1">
          <label htmlFor="lastName" className="mb-1 text-white">
            Last Name
          </label>
          <input
            {...register("lastName")}
            id="lastName"
            placeholder="e.g. Doe"
            className="border rounded p-2 bg-transparent text-white w-full"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="userName" className="mb-1 text-white">
          User Name
        </label>
        <input
          {...register("userName")}
          id="userName"
          placeholder="e.g. JohnDoe123"
          className="border rounded p-2 bg-transparent text-white w-full"
        />
        {errors.userName && (
          <p className="text-red-500 text-sm">{errors.userName.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 text-white">
          Your email
        </label>
        <input
          {...register("email")}
          id="email"
          placeholder="e.g. name@company.com"
          className="border rounded p-2 bg-transparent text-white w-full"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="mb-1 text-white">
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          id="password"
          placeholder="••••••••"
          className="border rounded p-2 bg-transparent text-white w-full"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <PrimaryButton type="submit" title="Sign Up" />
    </form>
  );
};

export default SignUpForm;
