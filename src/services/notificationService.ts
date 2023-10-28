import { parseFromUTC } from "@/util/dates";
import axios from "axios";

const strategy: any = {
    'LIKE_POST': (n: any) => {
        return {
            ...n,
            content: `${n.sender.nickName} liked your post.`,
            ctime: parseFromUTC(n.ctime),
            utime: parseFromUTC(n.utime),
            url: `/community/${n.post.communityId}/post/${n.post.id}`,
        }
    },
    'LIKE_COMMENT': (n: any) => {
        return {
            ...n,
            content: `${n.sender.nickName} liked your comment.`,
            ctime: parseFromUTC(n.ctime),
            utime: parseFromUTC(n.utime),
            url: `/community/${n.post.communityId}/post/${n.post.id}`,
        }
    },
    'COMMENT_POST': (n: any) => {
        return {
            ...n,
            content: `${n.sender.nickName} commented on your post.`,
            ctime: parseFromUTC(n.ctime),
            utime: parseFromUTC(n.utime),
            url: `/community/${n.post.communityId}/post/${n.post.id}`,
        }
    },
    'COMMENT_REPLY': (n: any) => {
        return {
            ...n,
            content: `${n.sender.nickName} replied to your comment.`,
            ctime: parseFromUTC(n.ctime),
            utime: parseFromUTC(n.utime),
            url: `/community/${n.post.communityId}/post/${n.post.id}`,
        }
    },
}

export const getNotifications = async (): Promise<TopicoNotification[]> => {
    const res = await axios.get("/api/v1/notifications").then((r) => r.data);
    if (res.code !== 200) return [];
    return res.data.map((n: any) => {
        return strategy[n.type](n);
    });
};

export const readNotification = async (notificationId: number): Promise<void> => {
    return await axios.post(`/api/v1/notifications/read/${notificationId}`).then(r => r.data);
};
