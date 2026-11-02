"use client";

import { ReactNode, useEffect } from "react";
import { tv } from "tailwind-variants";

export type ToastVariant = "success" | "error";

export type ToastData = {
  variant: ToastVariant;
  title: string;
  message?: ReactNode;
  action?: { label: string; onClick: () => void };
};

type Props = {
  toast: ToastData | null;
  onDismiss: () => void;
  autoDismissMs?: number;
};

const toastClass = tv({
  slots: {
    base: "pointer-events-auto flex w-full max-w-md items-start gap-4 border-l-4 bg-neutral-900 p-5 text-white shadow-2xl shadow-black/50 motion-safe:animate-toast-in",
    icon: "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
    action: "mt-3 text-base uppercase underline underline-offset-4",
  },
  variants: {
    variant: {
      success: { base: "border-sky-500", icon: "bg-sky-700" },
      error: { base: "border-red-500", icon: "bg-red-600" },
    },
  },
});

function Icon({ variant }: { variant: ToastVariant }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {variant === "success" ? (
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      ) : (
        <path d="M12 6v7M12 17.5v.5" />
      )}
    </svg>
  );
}

export default function Toast({
  toast,
  onDismiss,
  autoDismissMs = 6000,
}: Props) {
  // Errors stay until dismissed so they can't be missed; successes fade away.
  useEffect(() => {
    if (toast?.variant !== "success") return;
    const timer = setTimeout(onDismiss, autoDismissMs);
    return () => clearTimeout(timer);
  }, [toast, onDismiss, autoDismissMs]);

  const { base, icon, action } = toastClass({ variant: toast?.variant });

  return (
    <div
      aria-live={toast?.variant === "error" ? "assertive" : "polite"}
      className="pointer-events-none fixed inset-x-4 bottom-6 z-50 flex justify-center"
    >
      {toast && (
        <div
          className={base()}
          role={toast.variant === "error" ? "alert" : "status"}
        >
          <div className={icon()}>
            <Icon variant={toast.variant} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xl font-medium">{toast.title}</p>
            {toast.message && (
              <p className="mt-1 text-base text-gray-300">{toast.message}</p>
            )}
            {toast.action && (
              <button
                type="button"
                className={action()}
                onClick={toast.action.onClick}
              >
                {toast.action.label}
              </button>
            )}
          </div>
          <button
            type="button"
            aria-label="Dismiss notification"
            className="-m-1 p-1 text-gray-400 hover:text-white"
            onClick={onDismiss}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
