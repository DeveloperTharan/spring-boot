"use server";

import { z } from "zod";
import axios from "axios";
import { signinSchemma } from "@/schema/auth-schema";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const apiBaseUrl = process.env.API_BASE_URL;

export const SignIn = async (data: z.infer<typeof signinSchemma>) => {
  try {
    const res = await axios.post(`${apiBaseUrl}/auth/sign-in`, data);

    if (res.status != 200)
      return { error: "Something went's wrong try again!" };

    const token = res.data?.token;

    const claims = jwtDecode(token);

    if (!claims) return { error: "Not a valid Jwt token!" };

    cookies().set("_notion_jwt", token);

    return { success: "Signin successfully!", token };
  } catch (error) {
    console.log("SIGNIN ERROR", error);
    return { error: "Something went's wrong try again!" };
  }
};

export const SignUp = async (data: z.infer<typeof signinSchemma>) => {
  try {
    await axios.post(`${apiBaseUrl}/auth/sign-up`, data);

    return { success: "Signup successfully! Go and SignIn!" };
  } catch (error) {
    console.log("SIGNIN ERROR", error);
    return { error: "Something went's wrong try again!" };
  }
};

export const SignOut = async () => {
  try {
    return cookies().delete("_notion_jwt");
  } catch (error) {
    console.log("SIGNOUT ERROR", error);
    return null;
  }
};
