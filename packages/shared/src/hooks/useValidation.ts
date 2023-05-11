import { useCallback, useState } from "react";

export enum Validation {
    not_empty = "not_empty",
    email = "email",
    name = "name",
    phone = "phone",
}

export type InfoInput = {
    name: string;
    value?: string;
    validations?: Validation[];
};

type ErrorsMap = Map<string, { [key in Validation]?: boolean }>;

export const useValidation = () => {
    const [errors, setErrors] = useState<ErrorsMap>();

    const validate = useCallback((...inputs: InfoInput[]) => {
        let _errors: ErrorsMap = new Map();
        inputs.forEach((input) => {
            input.validations?.forEach((v) => {
                switch (v) {
                    case "not_empty":
                        if (!input.value) {
                            _errors.set(input.name, {
                                ..._errors.get(input.name),
                                not_empty: true,
                            });
                        }
                        break;
                    case "email":
                        if (
                            input.value &&
                            !input.value.match(
                                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                            )
                        )
                            _errors.set(input.name, {
                                ..._errors.get(input.name),
                                email: true,
                            });
                        break;
                    case "phone":
                        if (input.value && input.value.length < 10)
                            _errors.set(input.name, {
                                ..._errors.get(input.name),
                                phone: true,
                            });
                        break;
                }
            });
        });
        setErrors(new Map(_errors));
    }, []);

    return { errors, validate };
};
