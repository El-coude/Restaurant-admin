import { useRef } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { Button, Input } from "@fast-monorepo/shared/index";

const Login = () => {
    const email = useRef<HTMLInputElement>(null!);
    const pass = useRef<HTMLInputElement>(null!);
    const emailErr = useRef<HTMLParagraphElement>(null!);
    const passErr = useRef<HTMLParagraphElement>(null!);

    const { login } = useAuthStore((state) => state);
    const handleClick = (e?: MouseEvent) => {
        e?.preventDefault();
        login(
            email.current.value,
            pass.current.value,
            emailErr.current,
            passErr.current
        );
    };
    return (
        <form className="flex flex-col gap-2 px-6">
            <Input ref={email} type="text" label="Email" />
            <p className="text-rose-500" ref={emailErr}></p>
            <Input ref={pass} type="password" label="Password" />
            <p className="text-rose-500" ref={passErr}></p>
            <Button
                label="Login"
                onClick={handleClick}
                ocbButton
                className="mt-4"
            />
            <Link
                to="resetPass"
                className="text-primary-200 text-center hover:decoration-primary-200 hover:underline">
                Forgot your password ?
            </Link>
        </form>
    );
};

export default Login;
