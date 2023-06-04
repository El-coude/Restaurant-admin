import { Input } from "@fast-monorepo/shared/index";
import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const SetPassword = () => {
    const { changePass } = useAuthStore((state) => state);
    const pass = useRef<HTMLInputElement>(null!);
    const c_pass = useRef<HTMLInputElement>(null!);
    const [params] = useSearchParams();

    const navigate = useNavigate();

    const [err, setErr] = useState("");
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErr("");
        if (pass.current.value === c_pass.current.value) {
            await changePass(params.get("token")!, pass.current.value);
            navigate("/dashboard");
        } else {
            setErr("Passwords do not match");
        }
    };
    return (
        <div className="flex flex-col gap-2 px-6 w-[468px] m-auto mt-40">
            <Input ref={pass} type="password" label="Enter Password" />
            <p className="text-rose-500"></p>
            <Input ref={c_pass} type="password" label="Confirm Password" />
            <p className="text-rose-500">{err}</p>
            <button
                className="btn block btn-primary text-white"
                onClick={handleSubmit}>
                Set password
            </button>
        </div>
    );
};

export default SetPassword;
