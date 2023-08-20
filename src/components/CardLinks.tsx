import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/ThemeContext";
import { ICardLinks } from "../types";
import { LocationIcon } from "../icons/location-icon";
import { BlogIcon } from "../icons/blog-icon";
import { BlogNotIcon } from "../icons/blog-not-icon";
import { TwitterIcon } from "../icons/twitter-icon";
import { TwitterNotIcon } from "../icons/twitter-not-icon";
import { CompanyIcon } from "../icons/company-icon";

export const CardLinks = ({ links }: ICardLinks) => {
    const { sunTheme } = useContext(ThemeContext);

    return (
        <Container>
            <Link className={`${!links?.location && "unavailable"}`}>
                <LocationIcon sunTheme={sunTheme} />
                <Data>{links?.location ?? "Not Available"}</Data>
            </Link>

            <Link className={`${!links.blog && "unavailable"}`}>
                {links?.blog ? (
                    <a href={links.blog}>
                        <BlogIcon sunTheme={sunTheme} />
                        <Data>{links.blog}</Data>
                    </a>
                ) : (
                    <>
                        <BlogNotIcon sunTheme={sunTheme} />
                        <Data>Not Available</Data>
                    </>
                )}
            </Link>
            <Link className={`${!links?.twitter && "unavailable"}`}>
                {links?.twitter ? (
                    <a href={`https://twitter.com/${links.twitter}`}>
                        <TwitterIcon sunTheme={sunTheme} />
                        <Data>{links.twitter}</Data>
                    </a>
                ) : (
                    <>
                        <TwitterNotIcon sunTheme={sunTheme} />
                        <Data>Not available</Data>
                    </>
                )}
            </Link>
            <Link className={`${!links?.company && "unavailable"}`}>
                <CompanyIcon sunTheme={sunTheme} />
                <Data>{links.company || "Not Available"}</Data>
            </Link>
        </Container>
    );
};

const Container = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 2.4rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const Link = styled.li`
    display: flex;
    align-items: center;
    margin-top: 1rem;

    a {
        display: grid;
        grid-template-columns: 20px 1fr;
    }

    svg {
        width: 20px;
    }

    &.unavailable {
        opacity: 0.5;
    }
`;

const Data = styled.span`
    font-size: 1.4rem;
    line-height: 2rem;
    color: ${(props) => props.theme.colors.textNorm};
    word-break: break-all;
    margin-left: 2rem;

    @media (min-width: 768px) {
        font-size: 1.5rem;
    }
`;
