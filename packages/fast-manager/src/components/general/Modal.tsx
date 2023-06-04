import React, { PropsWithChildren } from "react";
import { GrFormClose } from "react-icons/gr";

type PropsType = {
    close: () => void;
};

const Modal: React.FC<PropsWithChildren & PropsType> = ({
    children,
    close,
}) => {
    return (
        <>
            <div className="fixed inset-0 opacity-50 bg-black w-full h-full z-50"></div>
            <div className="fixed p-8 bg-white rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                <GrFormClose
                    onClick={close}
                    className="ml-auto cursor-pointer"
                    size={24}
                />
                {children}
            </div>
        </>
    );
};

export default Modal;
