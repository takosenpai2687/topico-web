declare type LoginDto = {
    email: string;
    password: string;
};

declare type SignupDto = {
    email: string;
    nickName: string;
    password: string;
    confirmPassword: string;
};

declare type LoginVO = {
    email: string;
    nickName: string;
    token: string;
};
