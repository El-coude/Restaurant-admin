import React, { ChangeEvent, InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";

type InputProps = {
    primary?: boolean;
    backgroundColor?: string;
    type: string;
    hoverBgColor?: string;
    color?: string;
    size?: "small" | "medium" | "large" | "extraLarge";
    label?: string;
    rounded?: boolean;
    width?: number;
    borderColor?: string;
    borderWeigth?: number;
    onClick?: () => void;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    labelColor?: string;
    className?: string;
    autocomplete?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const StyledInput = styled.input<any>`
    ${({
        backgroundColor,
        width,
        size,
        borderWeigth,
        borderColor,
        rounded,
        hoverBgColor,
    }) =>
        css`
            background: ${backgroundColor};
            color: ${backgroundColor};
            width: ${!width ? "auto" : width + "px"};
            font-size: ${size == "extraLarge"
                ? "1.5"
                : size == "large"
                ? "1.25"
                : size == "medium"
                ? "1.15"
                : "0.8"}rem;
            padding: ${size == "extraLarge"
                ? "12px 32px"
                : size == "large"
                ? "10px 24px"
                : size == "medium"
                ? "8px 16px"
                : "4px 12px"};
            border: ${borderWeigth || 1}px solid ${borderColor || "black"};
            border-radius: ${rounded ? "999px" : "8px"};
            &:hover {
                background: ${hoverBgColor || backgroundColor};
            }
        `}
`;

const ContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const Label = styled.label<any>`
    color: ${({ labelColor }) => labelColor}
    font-size: ${({ size }) =>
        size == "extraLarge"
            ? "1.5"
            : size == "large"
            ? "1.25"
            : size == "medium"
            ? "1.15"
            : "0.8"}rem;
    display: block
`;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        { primary = false, size = "medium", type = "text", label, ...props },
        ref
    ) => {
        return (
            <ContainerDiv>
                {label && <Label>{label}</Label>}
                <StyledInput
                    ref={ref}
                    type={type}
                    size={size}
                    {...props}></StyledInput>
            </ContainerDiv>
        );
    }
);
