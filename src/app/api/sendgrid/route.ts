import { NextResponse } from "next/server";

export const runtime = "edge";

import { escapeUTF8 } from "entities";
import { contactSchema } from "@/globals/schema";

type FetchError = Error & {
  statusCode?: number;
};

export async function POST(request: Request) {
  const body: unknown = await request.json();

  const result = contactSchema.safeParse(body);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: { message: issue.message } };
    });

    return NextResponse.json({ errors: zodErrors });
  }

  const { name, email, message } = result.data;

  const emailBody = `Name: ${escapeUTF8(name)}\nEmail: ${escapeUTF8(email)}\nMessaqe: ${escapeUTF8(message)}`;

  const data = {
    personalizations: [
      {
        to: [
          {
            email: process.env.MAIL_TO,
          },
        ],
      },
    ],
    from: {
      email: process.env.MAIL_TO,
    },
    subject: "Space Dog Contact Form",
    content: [
      {
        type: "text/plain",
        value: emailBody,
      },
    ],
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.MAIL_API_KEY,
    },
    body: JSON.stringify(data),
  };

  try {
    await fetch(process.env.MAIL_API_URL, options);
    return NextResponse.json({ success: true });
  } catch (error) {
    const fetchError = error as FetchError;
    return NextResponse.json(
      {
        errors: {
          root: {
            message: fetchError.message || "An unknown error has occurred",
          },
        },
      },
      { status: fetchError.statusCode || 500 },
    );
  }
}
