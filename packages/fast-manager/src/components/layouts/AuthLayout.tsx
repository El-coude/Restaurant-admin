import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const { auth } = useAuthStore((state) => state);

    if (auth) return <Navigate to="/dashboard" />;
    return (
        <>
            <div className="flex h-screen">
                <div className="p-6 w-full md:w-[650px] flex flex-col gap-14">
                    <p className="text-primary-200 text-3xl text-center font-bold">
                        Fast traitteur
                    </p>
                    {children}
                </div>
                <div className="bg-black w-full hidden md:block"></div>
            </div>
            )
        </>
    );
};

export default AuthLayout;
