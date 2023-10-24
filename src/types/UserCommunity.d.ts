type UserCommunity = {
    id: number;
    userId: number;
    communityId: number;
    level: number;
    exp: number;
    nextExp: number;
    checkin: CheckinVO;
    ctime: string;
    utime: string;
};

type CheckinVO = {
    checkedToday: boolean;
    checkinDays: number;
}