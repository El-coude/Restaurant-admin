import React from "react";
import styled from "styled-components";

type InputProps = {
    primary?: boolean;
    backgroundColor?: string;
    type: string;
    hoverBgColor?: string;
    color?: string;
    size?: "small" | "medium" | "large" | "extraLarge";
    label: string;
    rounded?: boolean;
    width?: number;
    borderColor?: string;
    borderWeigth?: number;
    onClick?: () => void;
    onChange?: () => void;
    labelColor?: string;
    className?: string;
    autocomplete?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            primary = false,
            size = "medium",
            color,
            type = "text",
            rounded,
            backgroundColor,
            borderColor,
            borderWeigth = 1,
            label,
            width,
            labelColor,
            hoverBgColor,
            className,
            onChange,
            onClick,
            ...props
        },
        ref
    ) => {
        const Input = styled.input`
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
            border: ${borderWeigth}px solid ${borderColor};
            border-radius: ${rounded ? "999px" : "8px"};
            &:hover {
                background: ${hoverBgColor || backgroundColor};
            }
        `;

        const ContainerDiv = styled.div`
            display: flex;
            flex-direction: column;
            gap: 12px;
        `;

        const Label = styled.label`
        color: ${labelColor}
        font-size: ${
            size == "extraLarge"
                ? "1.5"
                : size == "large"
                ? "1.25"
                : size == "medium"
                ? "1.15"
                : "0.8"
        }rem;
        display: block
    `;
        return (
            <ContainerDiv>
                {label && <Label>{label}</Label>}
                <Input
                    ref={ref}
                    className={className}
                    onClick={onClick}
                    type={type}
                    onChange={onChange}
                    {...props}></Input>
            </ContainerDiv>
        );
    }
);
