declare type Pager<T> = {
    page: number;
    size: number;
    total: number;
    data: T;
};