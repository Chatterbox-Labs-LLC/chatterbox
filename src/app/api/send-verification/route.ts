import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'Email and code are required' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Chatterbox <onboarding@resend.dev>', // Replace with your verified domain in production
      to: [email],
      subject: 'Verify your email - Chatterbox',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 8px;">
          <h1 style="color: #0067b8; font-size: 24px; font-weight: bold; margin-bottom: 16px;">Verify your email</h1>
          <p style="color: #4a5568; font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
            Thanks for signing up for Chatterbox! Please use the verification code below to complete your registration.
          </p>
          <div style="background-color: #f7fafc; padding: 16px; text-align: center; border-radius: 8px; margin-bottom: 24px;">
            <span style="font-family: monospace; font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #1a202c;">
              ${code}
            </span>
          </div>
          <p style="color: #718096; font-size: 14px;">
            If you didn't request this email, you can safely ignore it.
          </p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
          <p style="color: #a0aec0; font-size: 12px; text-align: center;">
            &copy; 2026 Chatterbox Labs LLC
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
