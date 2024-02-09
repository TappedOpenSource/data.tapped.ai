import { Timestamp } from "firebase/firestore";

type Option<T> = T | null;

type Location = {
    placeId: string;
    geohash: string;
    lat: number;
    lng: number;
};

type SocialFollowing = {
    youtubeChannelId?: Option<string>;
    tiktokHandle?: Option<string>;
    tiktokFollowers: number;
    instagramHandle?: Option<string>;
    instagramFollowers: number;
    twitterHandle?: Option<string>;
    twitterFollowers: number;
}

type BookerInfo = {
    rating?: Option<number>;
    reviewCount: number;
}

type PerformerInfo = {
    pressKitUrl?: Option<string>;
    genres: string[];
    rating?: Option<number>;
    reviewCount: number;
    label: string;
    spotifyId?: Option<string>;
}

type VenueType = 'bar'
    | 'concertHall'
    | 'club'
    | 'restaurant'
    | 'theater'
    | 'arena'
    | 'stadium'
    | 'festival'
    | 'artGallery'
    | 'studio'
    | 'other';

type VenueInfo = {
    bookingEmail?: Option<string>;
    website?: Option<string>;
    phoneNumber?: Option<string>;
    capacity?: Option<number>;
    idealPerformerProfile?: Option<string>;
    productionInfo?: Option<string>;
    frontOfHouse?: Option<string>;
    monitors?: Option<string>;
    microphones?: Option<string>;
    lights?: Option<string>;
    type?: VenueType;
}

type EmailNotifications = {
    appReleases: boolean;
    tappedUpdates: boolean;
    bookingRequests: boolean;
}

type PushNotifications = {
    appReleases: boolean;
    tappedUpdates: boolean;
    bookingRequests: boolean;
    directMessages: boolean;
}

export type UserModel = {
    id: string;
    email: string;
    unclaimed: boolean;
    timestamp: Timestamp;
    username: string;
    artistName: string;
    bio: string;
    occupations: string[];
    profilePicture?: Option<string>;
    location?: Option<Location>;
    badgesCount: number;
    performerInfo?: Option<PerformerInfo>;
    venueInfo?: Option<VenueInfo>;
    bookerInfo?: Option<BookerInfo>;
    emailNotifications: EmailNotifications;
    pushNotifications: PushNotifications;
    deleted: boolean;    socialFollowing: SocialFollowing;
    stripeConnectedAccountId?: Option<string>;
    stripeCustomerId?: Option<string>;
}

export function getProfileImage(user: UserModel): string {
    if (
        user.profilePicture === undefined ||
        user.profilePicture === null ||
        user.profilePicture === '') {
        return '/images/default_avatar.png';
    }

    return user.profilePicture;
};
