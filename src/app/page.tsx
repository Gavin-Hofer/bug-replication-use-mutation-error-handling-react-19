"use client";
import type { NextPage } from "next";
import {
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
const Content: React.FC = () => {
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const mutation = useMutation({
    async mutationFn(throwError: boolean = false) {
      if (throwError) {
        throw new Error("Error from mutationFn");
      }
      return "Success";
    },
    onError: (error) => {
      console.error("Handling error from mutationFn:", error);
      setStatus("error");
    },
    onSuccess: (data) => {
      console.info("Handling success from mutationFn:", data);
      setStatus("success");
    },
  });

  return (
    <div className="p-8 max-w-2xl flex flex-col gap-4">
      <h1 className="text-2xl font-bold">
        Error handling example for useMutation (React 19)
      </h1>
      <div className="flex flex-col gap-2 w-48">
        <button
          className="bg-red-500 rounded-lg px-4 py-2 text-white text-lg"
          onClick={() => mutation.mutate(true)}
        >
          Trigger error
        </button>
        <button
          className="bg-blue-500 rounded-lg px-4 py-2 text-white text-lg"
          onClick={() => mutation.mutate(false)}
        >
          Trigger success
        </button>
      </div>
      <p>
        <strong>Status:</strong> {status}
      </p>
    </div>
  );
};

const Page: NextPage = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Content />
    </QueryClientProvider>
  );
};

export default Page;
