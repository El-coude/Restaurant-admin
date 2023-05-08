import styled from "styled-components";

type ButtonProps = {
    primary?: boolean;
    backgroundColor?: string;
    hoverBgColor?: string;
    color?: string;
    size?: "small" | "medium" | "large" | "extraLarge";
    label: string;
    rounded?: boolean;
    borderColor?: string;
    borderWeigth?: number;
    onClick?: () => void;
    ocbButton?: boolean;
    className?: string;
};

export const Button = ({
    primary = false,
    size = "medium",
    color,
    rounded,
    backgroundColor,
    borderColor,
    borderWeigth = 1,
    label,
    hoverBgColor,
    ocbButton,
    className,
    onClick,
    ...props
}: ButtonProps) => {
    const Button = styled.button`
        background: ${ocbButton ? "#499925" : backgroundColor};
        color: ${ocbButton ? "white" : backgroundColor};
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
        cursor: pointer;
        transition: 0.1s;
        &:hover {
            background: ${hoverBgColor || backgroundColor};
        }
    `;

    return (
        <Button className={className} onClick={onClick} {...props}>
            {label}
        </Button>
    );
};
