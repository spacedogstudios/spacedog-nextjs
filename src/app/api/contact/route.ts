import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { contactSchema, type ContactResponse } from "@/globals/schema";

function errorResponse(message: string, status: number) {
  return NextResponse.json<ContactResponse>(
    { errors: { root: { message } } },
    { status },
  );
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  if (body === null) return errorResponse("Invalid request", 400);

  const result = contactSchema.safeParse(body);

  if (!result.success) {
    const errors: ContactResponse["errors"] = {};
    for (const issue of result.error.issues) {
      const field = (issue.path[0] ?? "root") as keyof typeof errors;
      errors[field] ??= { message: issue.message };
    }
    return NextResponse.json<ContactResponse>({ errors }, { status: 400 });
  }

  const { name, email, message, website } = result.data;

  // Bots that fill in the hidden field get a success response but no email.
  if (website) return NextResponse.json<ContactResponse>({ success: true });

  const env = getCloudflareContext().env;

  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  const { success: withinLimit } = await env.CONTACT_RATE_LIMITER.limit({
    key: ip,
  });
  if (!withinLimit) {
    return errorResponse(
      "Too many messages sent. Please wait a minute and try again",
      429,
    );
  }

  if (!env.MAIL_API_URL) {
    console.error("MAIL_API_URL is not set");
    return errorResponse("Sorry, your message couldn't be sent", 500);
  }

  const response = await fetch(env.MAIL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + env.MAIL_API_KEY,
    },
    body: JSON.stringify({
      from: env.MAIL_TO,
      to: [env.MAIL_TO],
      reply_to: email,
      subject: "Space Dog Contact Form",
      // Plain text, so no HTML escaping is needed.
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    }),
  }).catch((error: unknown) => {
    console.error("Email service request failed:", error);
    return null;
  });

  if (!response?.ok) {
    if (response) {
      console.error(
        `Email service responded ${response.status}: ${await response.text()}`,
      );
    }
    return errorResponse("Sorry, your message couldn't be sent", 502);
  }

  return NextResponse.json<ContactResponse>({ success: true });
}
