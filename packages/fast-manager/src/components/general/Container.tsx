import { PropsWithChildren } from "react";

const Container = ({
    children,
    className,
}: { className?: string } & PropsWithChildren) => {
    return (
        <div className={`bg-white p-10 shadow-lg ${className}`}>{children}</div>
    );
};

export default Container;
