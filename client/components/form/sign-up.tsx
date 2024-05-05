"use client";

import React, { useTransition } from "react";

import { z } from "zod";
import { toast } from "sonner";
import { SignUp } from "@/action/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchemma as formSchema } from "@/schema/auth-schema";

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

export const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      SignUp(values).then((data) => {
        if (data.success) {
          return toast.success(data.success);
        }
        if (data.error) return toast.error(data.error);
      });
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div className="w-full flex items-center justify-center gap-4 mt-2">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="firstname"
                    {...field}
                    className="w-full h-10 border border-neutral-400"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="lastname"
                    {...field}
                    className="w-full h-10 border border-neutral-400"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
          {isPending ? <Spinner /> : "SignUp"}
        </Button>
      </form>
    </Form>
  );
};
