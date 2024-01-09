export type UserModel = {
    id: string;
    email: string;
    username: string;
    artistName: string;
    bio: string;
    profilePicture?: string;
    overallRating?: number;
    placeId?: string;
    tiktokHandle?: string;
    tiktokFollowers?: number;
    twitterHandle?: string;
    twitterFollowers?: number;
    instagramHandle?: string;
    instagramFollowers?: number;
    youtubeChannelId?: string;
    spotifyId?: string;
    occupations?: string[];
    label?: string;
    genres?: string[];
    reviewCount: number,
    followerCount: number,
    followingCount: number,
};
