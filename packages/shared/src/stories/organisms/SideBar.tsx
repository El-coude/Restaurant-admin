import React, { PropsWithChildren, ReactElement, useState } from "react";
import styled, { css } from "styled-components";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

interface SideBarProps {
    backgroundColor?: string;
    width?: string;
    closedWidth?: string;
    height?: string;
    padding?: string;
    fontSize?: string;
    logo?: ReactElement;
    closeIcon?: ReactElement;
    toggle?: (open: boolean) => void;
}

const SideBarContainer = styled.div<SideBarProps>`
    background-color: ${(props) => props.backgroundColor || "#ededed"};
    transition: 0.2s;
    height: ${(props) => props.height || "100vh"};
    padding: ${(props) => props.padding || "1rem 0.9rem"};
    font-size: ${(props) => props.fontSize || "auto"};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const SideBar: React.FC<SideBarProps & PropsWithChildren> = ({
    closeIcon = <BsFillArrowLeftCircleFill color="#499925" width={16} />,
    width = "260px",
    closedWidth = "64px",
    ...props
}) => {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    const handleResize = () => {
        if (window.innerWidth < 600) setOpen(false);
        else setOpen(true);
    };

    React.useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    React.useEffect(() => {
        props.toggle && props.toggle(open);
    }, [open]);
    const LogoContainer = styled.div`
        width: 100%;
        margin-bottom: 2rem;
        position: relative;
        min-height: 20px;
    `;

    const CloseButton = styled.div<{ clicked?: boolean }>`
        cursor: pointer;
        transition: 0.2s;
        position: absolute;
        right: 0;
        top: 50%;
        transform: rotate(0deg) translateY(-50%);
        ${(props) =>
            props.clicked &&
            css`
                transform: rotate(180deg) translateX(-50%);
                right: 50%;
            `}
    `;
    const [closeButton, setCloseButton] = useState(false);

    const showCloseButton = () => {
        setCloseButton(true);
    };

    const hideCloseButton = () => {
        setCloseButton(false);
    };

    return (
        <SideBarContainer
            {...props}
            style={{
                width: open ? width : closedWidth,
            }}>
            <LogoContainer
                onMouseOver={showCloseButton}
                onMouseLeave={hideCloseButton}>
                {open && props.logo}
                <CloseButton onClick={handleClick} clicked={!open}>
                    {(closeButton || !open) && closeIcon}
                </CloseButton>
            </LogoContainer>
            {props.children}
        </SideBarContainer>
    );
};

interface SideBarElementProps {
    icon?: JSX.Element;
    text: string;
    link?: string;
    open?: boolean;
    active?: boolean;
    color: string;
    onClick?: () => void;
}

const SideBarElementContainer = styled.div<{
    open: boolean;
    color: string;
    active?: boolean;
}>`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 15px;
    cursor: pointer;
    padding: 12px;
    border-radius: 8px;
    &:hover {
        background-color: ${({ color }) => color};
        color: white;
    }
    ${({ open }) =>
        css`
            width: ${open ? "80%" : ""};
            justify-content: ${open ? "start" : "center"};
        `}
    ${({ active, color }) =>
        css`
            background-color: ${active ? color : ""};
            color: ${active ? "white" : ""};
        `}
`;

const IconContainer = styled.div`
    max-height: 24px;
    & img {
        width: 24px;
        height: 24px;
    }
`;

const TextContainer = styled.div`
    font-size: 16px;
`;

export const SideBarElement: React.FC<SideBarElementProps> = (props) => {
    return (
        <SideBarElementContainer
            onClick={props.onClick}
            active={!!props.active}
            open={!!props.open}
            color={props.color}>
            <IconContainer>{props.icon}</IconContainer>
            {props.open && <TextContainer>{props.text}</TextContainer>}
        </SideBarElementContainer>
    );
};
