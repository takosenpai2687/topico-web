import axios, { HttpStatusCode } from "axios";
import ROOT from "@/services/root";
import { getUserInfo } from "@/services/userService";

const LOGIN = ROOT + "/api/v1/auth/login";
const SIGN_UP = ROOT + "/api/v1/auth/signup";

export const login = async (loginDto: LoginDto): Promise<User> => {
    const { email, password } = loginDto;
    const loginRes: CommonResponse<LoginVO> = await axios
        .post(LOGIN, { email, password }, { withCredentials: true })
        .then((r) => r.data);
    if (loginRes.code !== HttpStatusCode.Ok || !loginRes.data?.token?.length)
        throw new Error(loginRes.message);
    axios.defaults.headers.common["Authorization"] = `Bearer ${loginRes.data.token}`;
    localStorage.setItem("token", loginRes.data.token);
    localStorage.setItem("email", loginRes.data.email);
    // Get user
    const user: User = await getUserInfo();
    return user;
};

export const signup = async (signupDto: SignupDto): Promise<User> => {
    const { email, nickName, password, confirmPassword } = signupDto;
    if (password !== confirmPassword) throw new Error("Password not match");
    const signupRes: CommonResponse<LoginVO> = await axios
        .post(
            SIGN_UP,
            { email, nickName, password, confirmPassword },
            { withCredentials: true }
        )
        .then((r) => r.data);
    if (signupRes.code !== HttpStatusCode.Ok || !signupRes.data)
        throw new Error(signupRes.message);
    axios.defaults.headers.common["Authorization"] = `Bearer ${signupRes.data.token}`;
    localStorage.setItem("token", signupRes.data.token);
    localStorage.setItem("email", signupRes.data.email);
    // Get user
    const user: User = await getUserInfo();
    return user;
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = "";
};
