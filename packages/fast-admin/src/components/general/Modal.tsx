import React, { PropsWithChildren } from "react";
import { GrFormClose } from "react-icons/gr";

type PropsType = {
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: React.FC<PropsWithChildren & PropsType> = ({
    children,
    setVisible,
}) => {
    return (
        <>
            <div className="absolute inset-0 opacity-50 bg-black w-full h-full"></div>
            <div className="absolute p-8 bg-white rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <GrFormClose
                    onClick={() => setVisible(false)}
                    className="ml-auto cursor-pointer"
                    size={24}
                />
                {children}
            </div>
        </>
    );
};

export default Modal;
