import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
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
  const env = getCloudflareContext().env;

  const emailBody = `Name: ${escapeUTF8(name)}\nEmail: ${escapeUTF8(email)}\nMessage: ${escapeUTF8(message)}`;

  const data = {
    from: env.MAIL_TO,
    to: [env.MAIL_TO],
    reply_to: email,
    subject: "Space Dog Contact Form",
    text: emailBody,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + env.MAIL_API_KEY,
    },
    body: JSON.stringify(data),
  };

  try {
    const url = env.MAIL_API_URL;
    if (!url) throw new Error("No email service defined.");

    const response = await fetch(url, options);
    if (!response.ok) {
      console.error(
        `Email service responded ${response.status}: ${await response.text()}`,
      );
      const serviceError: FetchError = new Error(
        "Sorry, your message couldn't be sent",
      );
      serviceError.statusCode = 502;
      throw serviceError;
    }

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
