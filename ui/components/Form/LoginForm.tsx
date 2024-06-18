"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PrimaryButton from "../Buttons/PrimaryButton";
import z from "zod";
import { LoginSchema } from "@/util/validation/login-schema";
import useAuthStore from "@/store/auth-store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type LoginProp = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProp>({
    resolver: zodResolver(LoginSchema),
  });
  const router = useRouter();

  const { login, error } = useAuthStore();

  const onSubmit = async (data: LoginProp) => {
    try {
      await login(data);
      router.push("/home");
    } catch (e) {
      toast(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 p-4 rounded-lg shadow-2xl w-full max-w-xl"
    >
      <div className="flex flex-col mb-4">
        <label htmlFor="userName" className="mb-1 text-white">
          User Name
        </label>
        <input
          {...register("userName")}
          id="userName"
          placeholder="e.g.  JohnDoe123"
          className="border rounded p-2  bg-transparent"
        />
        {errors.userName && (
          <p className="text-red-500 text-sm">{errors.userName.message}</p>
        )}
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="password" className="mb-1 text-white">
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          id="password"
          placeholder="••••••••"
          className="border rounded p-2  bg-transparent"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <PrimaryButton type="submit" title="Login" />
    </form>
  );
};

export default LoginForm;
