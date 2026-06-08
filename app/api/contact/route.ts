import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/content/site";

// Basic guards so we don't relay junk or oversized payloads.
const MAX = { name: 120, email: 200, message: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Escape user input before interpolating into the HTML email. */
function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** On-brand HTML email template for inbound enquiries. */
function buildHtml(name: string, email: string, message: string) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const firstName = safeName.split(" ")[0] || "them";
  const sentAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px 0;background:#f4f6fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;">
      <tr>
        <td align="center" style="padding:0 16px;">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:560px;max-width:100%;background:#ffffff;border:1px solid #e6e9f0;border-radius:16px;overflow:hidden;">
            <!-- Header -->
            <tr>
              <td style="background:#0a0e1a;padding:26px 30px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font:600 12px/1 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:2px;text-transform:uppercase;color:#8a93a6;">
                      <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#3b82f6;vertical-align:middle;margin-right:8px;"></span>New Enquiry
                    </td>
                    <td align="right" style="font:600 13px/1 -apple-system,Helvetica,Arial,sans-serif;color:#b4bccc;">${escapeHtml(site.name)}</td>
                  </tr>
                </table>
                <div style="margin-top:14px;font:700 26px/1.2 Georgia,'Times New Roman',serif;color:#ffffff;">Website Enquiry</div>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding:28px 30px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#0a0e1a;">
                  <tr>
                    <td style="padding:5px 0;color:#5a6577;width:64px;vertical-align:top;">Name</td>
                    <td style="padding:5px 0;font-weight:600;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;color:#5a6577;vertical-align:top;">Email</td>
                    <td style="padding:5px 0;"><a href="mailto:${safeEmail}" style="color:#2563eb;text-decoration:none;font-weight:600;">${safeEmail}</a></td>
                  </tr>
                </table>

                <div style="margin-top:14px;color:#5a6577;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Message</div>
                <div style="margin-top:8px;padding:16px 18px;background:#f7f8fb;border-left:3px solid #3b82f6;border-radius:8px;color:#1f2937;font-size:15px;line-height:1.65;">${safeMessage}</div>

                <div style="margin-top:26px;">
                  <a href="mailto:${safeEmail}?subject=Re%3A%20your%20enquiry" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 24px;border-radius:999px;">Reply to ${firstName}</a>
                </div>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="padding:16px 30px;border-top:1px solid #eef1f7;font-size:12px;color:#8a93a6;">
                Sent from your portfolio contact form &middot; ${sentAt}
              </td>
            </tr>
          </table>
          <div style="margin-top:14px;font-size:11px;color:#aab2c2;">${escapeHtml(site.url)}</div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(req: Request) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (
    name.length > MAX.name ||
    email.length > MAX.email ||
    message.length > MAX.message
  ) {
    return NextResponse.json({ error: "Input too long." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Misconfiguration, not a user error — log for the operator.
    console.error("RESEND_API_KEY is not set; cannot send contact email.");
    return NextResponse.json(
      { error: "Email service is not configured yet." },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Website Enquiry — ${name}`,
      html: buildHtml(name, email, message),
      text: [
        "New enquiry from your portfolio website.",
        "",
        `Name:    ${name}`,
        `Email:   ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Couldn't send right now. Please email me directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please email me directly." },
      { status: 500 },
    );
  }
}
