"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { toast } from "sonner";
import { SignIn } from "@/action/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchemma as formSchema } from "@/schema/auth-schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { Input } from "@/components/ui/input";

export const SignInForm = () => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      SignIn(values).then((data) => {
        if (data.success) {
          sessionStorage.setItem("notion_jwt", data.token);
          toast.success(data.success);
          return router.push("/workspace");
        }
        if (data.error) return toast.error(data.error);
      });
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="email"
                  {...field}
                  className="w-full h-10 border border-neutral-400"
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="password"
                  {...field}
                  className="w-full h-10 border border-neutral-400"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Spinner /> : "SignIn"}
        </Button>
      </form>
    </Form>
  );
};
