"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/util/validation/sign-up-schema";
import PrimaryButton from "../Buttons/PrimaryButton";
import z from "zod";

type SignUpProp = z.infer<typeof SignUpSchema>;

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpProp>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = (data: SignUpProp) => {
    console.log(data);
  };

  return (
   
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 p-4 border rounded-lg bg-white shadow-md w-full max-w-xl"
      >
        <div className="flex flex-col sm:flex-row justify-around">
          <div className="flex flex-col mb-4">
            <label htmlFor="firstName" className="mb-1">
              First Name
            </label>
            <input
              {...register("firstName")}
              id="firstName"
              placeholder="e.g., John"
              className="border rounded p-2"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="lastName" className="mb-1">
              Last Name
            </label>
            <input
              {...register("lastName")}
              id="lastName"
              placeholder="e.g., Doe"
              className="border rounded p-2"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="userName" className="mb-1">
            User Name
          </label>
          <input
            {...register("userName")}
            id="userName"
            placeholder="e.g., JohnDoe123"
            className="border rounded p-2"
          />
          {errors.userName && (
            <p className="text-red-500 text-sm">{errors.userName.message}</p>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="mb-1">
            Your email
          </label>
          <input
            {...register("email")}
            id="email"
            placeholder="e.g., name@company.com"
            className="border rounded p-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password" className="mb-1">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="••••••••"
            className="border rounded p-2"
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
