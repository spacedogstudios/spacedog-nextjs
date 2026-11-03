"use client";

import {
  ComponentPropsWithoutRef,
  ReactNode,
  useCallback,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  contactSchema,
  type ContactResponse,
  type TContactSchema,
} from "@/globals/schema";
import Spinner from "@/components/ui/Spinner";
import Toast, { ToastData } from "@/components/ui/Toast";
import { tv } from "tailwind-variants";

const messageClass = tv({ base: "text-xl text-red-500 pb-4 -mt-2" });
const inputClass =
  "block w-full appearance-none leading-8 text-lg text-gray-200 \
  bg-transparent border-b outline-hidden focus:border-b focus:border-sky-700";

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

const FIELDS = ["name", "email", "message"] as const;

async function sendData(data: TContactSchema): Promise<Response> {
  return await fetch("/api/contact", {
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
  const [toast, setToast] = useState<ToastData | null>(null);
  const dismissToast = useCallback(() => setToast(null), []);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
  } = useForm<TContactSchema>({
    resolver: zodResolver(contactSchema),
  });

  const showError = (message: string) =>
    setToast({
      variant: "error",
      title: "Message not sent",
      message: `${message.replace(/\.$/, "")}. Your message is still in the form.`,
      action: {
        label: "Try again",
        onClick: () => {
          setToast(null);
          handleSubmit(onSubmit)();
        },
      },
    });

  const onSubmit = async (data: TContactSchema) => {
    try {
      clearErrors();
      setToast(null);

      const response = await sendData(data);
      const responseData = (await response
        .json()
        .catch(() => ({}))) as ContactResponse;
      const errors = responseData.errors ?? {};

      const fieldsWithErrors = FIELDS.filter((field) => errors[field]);
      fieldsWithErrors.forEach((field) =>
        setError(field, { type: "server", message: errors[field]?.message }),
      );
      if (fieldsWithErrors.length) return;

      if (!response.ok || errors.root) {
        showError(
          errors.root?.message ||
            response.statusText ||
            "An unknown error occurred",
        );
        return;
      }

      reset();
      setToast({
        variant: "success",
        title: "Message sent",
        message: "Thanks for getting in touch. You'll hear from us soon!",
      });
    } catch (error) {
      showError(
        error instanceof Error && error.message
          ? error.message
          : "An unknown error occurred",
      );
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)} noValidate>
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
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>
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
      <Toast toast={toast} onDismiss={dismissToast} />
    </form>
  );
}
