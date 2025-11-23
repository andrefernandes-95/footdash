import EmailInput from "@/app/components/email-input/email-input";
import ErrorMessage from "@/app/components/error-message/error-message";
import PasswordInput from "@/app/components/password-input/password-input";
import SubmitButton from "@/app/components/submit-button/submit-button";
import { FormEventHandler } from "react";

interface Props {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    error: string;
    handleSubmit: FormEventHandler<HTMLFormElement>
}

export default function LoginForm({ email, setEmail, password, setPassword, handleSubmit, error }: Props) {
    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
            <ErrorMessage message={error} />
            <SubmitButton label={"Sign In"} />
        </form>
    );
}
