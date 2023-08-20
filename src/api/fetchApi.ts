import { IUserResponse } from "../types";
const API = "https://api.github.com/users/";

export const fetchUser = async (name: string) => {
    const response = await fetch(`${API}${name}`);
    const data = await response.json();

    if (response.status != 200) {
        return false;
    }

    const user: IUserResponse = {
        avatar: data?.avatar_url,
        name: data?.name,
        joined: data?.created_at,
        username: data?.login,
        bio: data?.bio,
        repos: data?.public_repos,
        followers: data?.followers,
        following: data?.following,
        links: {
            location: data?.location,
            twitter: data?.twitter_username,
            company: data?.company,
            blog: data?.blog,
        },
    };

    return user;
};
