export const setLocalStorage = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("user")!);
};
