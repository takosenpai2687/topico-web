declare type User = {
    id: number;
    nickName: string;
    email: string;
    gender?: 'FEMALE' | 'MALE' | 'NOT_KNOWN' | 'NOT_APPLICABLE';
    avatar?: number;
    exp?: number;
    level?: number;
    description?: string;
};

declare type UpdateUserDto = {
    nickName?: string;
    gender?: 'FEMALE' | 'MALE' | 'NOT_KNOWN' | 'NOT_APPLICABLE';
    avatar?: number;
    description?: string;
}