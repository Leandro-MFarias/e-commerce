import ResetPassword from "@/app/components/resetPassword";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ResetPassword />
    </Suspense>
  );
}
