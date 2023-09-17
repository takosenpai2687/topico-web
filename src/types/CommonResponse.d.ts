declare type CommonResponse<T> = {
    code: number;
    message: string;
    data: T;
};
