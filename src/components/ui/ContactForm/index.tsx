"use client";

import {
  ComponentPropsWithoutRef,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { contactSchema, TContactSchema } from "@/globals/schema";
import Spinner from "@/components/ui/Spinner";
import { tv } from "tailwind-variants";

type FetchResponse = Response & {
  errors?: FieldErrors<TContactSchema>;
};

const messageClass = tv({ base: "text-xl text-red-500 pb-4 -mt-2" });
const inputClass =
  "block w-full appearance-none leading-8 text-lg text-gray-200 \
  bg-transparent border-b outline-none focus:border-b focus:border-sky-700";

function Message(
  message: ReactNode,
  className: string = "",
  role: string = "alert",
) {
  return (
    <div className={messageClass({ class: className })} role={role}>
      {message}
    </div>
  );
}

async function sendData(data: TContactSchema): Promise<FetchResponse> {
  return await fetch("/api/sendgrid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export default function ContactForm({
  className,
}: ComponentPropsWithoutRef<"form">) {
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
    watch,
  } = useForm<TContactSchema>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    const subscription = watch(() => setSubmittedSuccessfully(false));
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: TContactSchema) => {
    try {
      clearErrors();

      const response = await sendData(data);

      const responseData: FetchResponse = await response.json();

      if (!response.ok) {
        setError("root", {
          type: "server",
          message:
            responseData?.errors?.root?.message ||
            response.statusText ||
            "An unknown error occurred.",
        });

        return;
      }

      if (responseData.errors) {
        const errors: FieldErrors<TContactSchema> = responseData.errors;

        if (errors.name) {
          setError("name", {
            type: "server",
            message: errors.name.message,
          });
        } else if (errors.email) {
          setError("email", {
            type: "server",
            message: errors.email.message,
          });
        } else if (errors.message) {
          setError("message", {
            type: "server",
            message: errors.message.message,
          });
        } else {
          throw new Error(errors.root?.message || "An unknown error occurred.");
        }

        return;
      }

      reset();
      setSubmittedSuccessfully(true);
    } catch (error) {
      const errorMessage: string =
        error instanceof Error && error.message
          ? error.message
          : "An unknown error occurred.";
      setError("root", {
        type: "server",
        message: errorMessage,
      });
    }
  };

  const formatRootError = (message: string) => (
    <>
      {message}. You can <button className="underline">submit again</button> or{" "}
      <button className="underline" onClick={() => reset()}>
        reset form
      </button>{" "}
      and try again.
    </>
  );

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)} noValidate>
      {errors.root?.message &&
        Message(formatRootError(errors.root.message), "pt-4")}
      {submittedSuccessfully &&
        Message(
          "Message sent. You'll hear from us soon!",
          "text-white text-center pt-4",
          "status",
        )}
      <label className="sr-only" htmlFor="name">
        name
      </label>
      <input
        id="name"
        autoComplete="name"
        className={
          inputClass +
          "  h-20 mb-4" +
          (errors.name ? " border-red-500" : " border-gray-200")
        }
        {...register("name")}
        placeholder="Your name"
      />
      {errors.name && Message(errors.name.message)}
      <label className="sr-only" htmlFor="email">
        email
      </label>
      <input
        id="email"
        {...register("email")}
        type="email"
        autoComplete="email"
        placeholder="Your email"
        className={
          inputClass +
          "  h-20 mb-10" +
          (errors.email ? " border-red-500" : " border-gray-200")
        }
      />
      {errors.email && Message(errors.email.message, "-mt-8 mb-6")}
      <label className="sr-only" htmlFor="message">
        message
      </label>
      <textarea
        id="message"
        {...register("message")}
        rows={4}
        placeholder="Your message"
        className={
          inputClass +
          " pb-8 mb-8" +
          (errors.message ? " border-red-500" : " border-gray-200")
        }
      />
      {errors.message && Message(errors.message.message, "-mt-6 mb-4")}
      <button
        disabled={isSubmitting}
        className="relative flex justify-center items-center w-full h-16 bg-sky-700 uppercase text-xl text-white"
      >
        <div className="relative px-10">
          {isSubmitting && (
            <Spinner
              className="absolute left-0 h-6 w-6"
              spinnerClassName="fill-white text-sky-800"
            />
          )}
          Submit
        </div>
      </button>
    </form>
  );
}
