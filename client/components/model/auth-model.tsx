"use client";

import React, { useState } from "react";
import Image from "next/image";

import { SignInForm } from "../form/sign-in";
import { SignUpForm } from "../form/sign-up";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoYoutube,
} from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

export const AuthModel = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState("signin");
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-10">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center justify-center text-center h-auto gap-2">
            <Image src={"/logo.png"} alt="logo" width={40} height={40} />
            <span className="text-neutral-600 text-sm">Welcome to Notion!</span>
          </DialogTitle>
          <DialogDescription>
            {auth === "signin" ? <SignInForm /> : <SignUpForm />}
            {auth === "signin" ? (
              <div className="my-3 flex items-center gap-x-2">
                <p>Dont have a accound?</p>
                <Link
                  href={""}
                  className="underline underline-offset-2"
                  onClick={() => setAuth("signup")}
                >
                  signUp
                </Link>
              </div>
            ) : (
              <div className="my-3 flex items-center gap-x-2">
                <p>Already have a accound?</p>
                <Link
                  href={""}
                  className="underline underline-offset-2"
                  onClick={() => setAuth("signin")}
                >
                  signin
                </Link>
              </div>
            )}
          </DialogDescription>
          <div className="flex gap-4 mt-4 items-center justify-center">
            <IoLogoInstagram className="text-[22px] text-gray-500 hover:text-pink-700 cursor-pointer" />
            <IoLogoTwitter className="text-[22px] text-gray-500 hover:text-blue-600 cursor-pointer" />
            <FaLinkedinIn className="text-[22px] text-gray-500 hover:text-blue-600 cursor-pointer" />
            <IoLogoFacebook className="text-[22px] text-gray-500 hover:text-blue-600 cursor-pointer" />
            <IoLogoYoutube className="text-[22px] text-gray-500 hover:text-red-600 cursor-pointer" />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
