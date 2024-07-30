import { json, redirect } from "@remix-run/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const loader = async () => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["peter.christie.dev@gmail.com"],
    subject: "Hello world",
    html: "<strong>It works!</strong>"
  });

  if (error) {
    return json({ error }, 400);
  }

  return redirect("/contact");
};
