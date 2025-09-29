import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_GMAIL,
    pass: process.env.MY_GMAIL_PASS,
  },
});

export async function sendPasswordResetEmail(email, resetUrl) {
  await transporter.sendMail({
    from: `"Reload Store" <${process.env.MY_GMAIL}>`,
    to: email,
    subject: "Reset de senha - Reload Store",
    html: `
      <p>Você solicitou reset de senha.</p>
      <p>
        Clique aqui para redefinir:
        <a href="${resetUrl}">${resetUrl}</a>
      </p>
      <p>Esse link expira em 1 hora.</p>
    `,
  });
}