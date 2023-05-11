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

const StyledButton = styled.button<ButtonProps>`
    background: ${(props) =>
        props.ocbButton ? "#499925" : props.backgroundColor};
    color: ${(props) => (props.ocbButton ? "white" : props.color)};
    font-size: ${(props) =>
        props.size == "extraLarge"
            ? "1.5"
            : props.size == "large"
            ? "1.25"
            : props.size == "medium"
            ? "1.15"
            : "0.8"}rem;
    padding: ${(props) =>
        props.size == "extraLarge"
            ? "12px 32px"
            : props.size == "large"
            ? "10px 24px"
            : props.size == "small"
            ? "4px 12px"
            : "8px 16px"};
    border: ${(props) => props.borderWeigth || "1"}px solid
        ${(props) => props.borderColor};
    border-radius: ${(props) => (props.rounded ? "999px" : "8px")};
    cursor: pointer;
    transition: 0.1s;
    &:hover {
        background: ${(props) => props.hoverBgColor || props.backgroundColor};
    }
`;

export const Button = ({ primary = false, ...props }: ButtonProps) => {
    return <StyledButton {...props}>{props.label}</StyledButton>;
};
