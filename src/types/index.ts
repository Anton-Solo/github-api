export interface IUserResponse {
    avatar: string;
    name: string;
    joined: string;
    username: string;
    bio: string;
    repos: string;
    followers: string;
    following: string;
    links: {
        location: string;
        twitter: string;
        blog: string;
        company: string;
    };
}

export interface IHeader {
    setUser: (user: IUserResponse | null) => void;
}

export interface IUser {
    user: IUserResponse;
}

export interface ICardHeader {
    username: string;
    bio: string;
    name: string;
    joinedAt: string;
    pfp: string;
}

export interface ICardInfo {
    repos: string;
    followers: string;
    following: string;
}

export interface ICardLinks {
    links: {
        location: string;
        blog: string;
        twitter: string;
        company: string;
    };
}
