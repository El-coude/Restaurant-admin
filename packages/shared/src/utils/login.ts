import axios, { AxiosError, AxiosResponse } from "axios";
import { checkEmail, checkLength } from "./validation";
import { API_URL } from "../env";

export const login: LoginFn = (
    email,
    password,
    url,
    emailErrLabel,
    passErrLabel
) => {
    return new Promise<AxiosResponse<any, any>>(async (resolve, reject) => {
        const passValid = checkLength(password, passErrLabel);
        const emailValid = checkEmail(email, emailErrLabel);
        if (passValid && emailValid) {
            try {
                const res = await axios.post(url, {
                    email: email,
                    password: password,
                });
                resolve(res);
                /* set({
                auth: {
                    token: res.data.accessToken,
                    email: email,
                    role: "superAdmin", //place holder
                },
            }); */
            } catch (error) {
                if ((error as AxiosError).response?.status == 403) {
                    passErrLabel.innerText = "Wrong email or password";
                    return;
                }
                passErrLabel.innerText = "Network error, try later";
                reject();
            }
        }
        reject();
    });
};

export type LoginFn = (
    email: string,
    password: string,
    url: string,
    emailErrLabel: HTMLParagraphElement,
    passErrLabel: HTMLParagraphElement
) => Promise<AxiosResponse<any, any>>;
