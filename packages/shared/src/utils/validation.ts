export const checkLength = (
    password: string,
    errLabel: HTMLParagraphElement
) => {
    if (password.length < 8) {
        errLabel.innerText = password.length
            ? "min 8 characters"
            : "Enter a password";
        return false;
    } else {
        errLabel.innerText = "";
        return true;
    }
};

export const checkEmail = (email: string, errLabel: HTMLParagraphElement) => {
    let regex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email)) {
        errLabel.innerText = email.length ? "Email invalid" : "Enter email";
        return false;
    } else {
        errLabel.innerText = "";
        return true;
    }
};
