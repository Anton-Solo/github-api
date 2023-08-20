import { useContext, useState, useRef } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/ThemeContext";
import { IHeader } from "../types";
import { fetchUser } from "../api/fetchApi";
import { SunIcon } from "../icons/sun-icon";
import { MoonIcon } from "../icons/moon-icon";
import { SearchIcon } from "../icons/search-icon";

export const Header = ({ setUser }: IHeader) => {
    const { changeTheme, sunTheme } = useContext(ThemeContext);
    const [empty, setEmpty] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const usernameRef = useRef<HTMLInputElement>(null);

    const hadleSubmit = async () => {
        if (usernameRef.current?.value.trim() === "" || usernameRef.current?.value === undefined) {
            setEmpty(true);
            setUser(null);
            return;
        }

        setEmpty(false);
        setNotFound(false);
        setUser(null);
        setLoading(true);
        const user = await fetchUser(usernameRef.current.value);
        setLoading(false);

        if (user) {
            setUser(user);
        } else {
            setNotFound(true);
            setUser(null);
        }
    };

    return (
        <Container>
            {loading ? (
                <Loader>
                    <img src="https://i.gifer.com/XOsX.gif" alt="loading" />
                </Loader>
            ) : (
                <>
                    <Theme>
                        <ChangeTheme type="button" onClick={changeTheme}>
                            {sunTheme ? (
                                <>
                                    DARK <MoonIcon />
                                </>
                            ) : (
                                <>
                                    LIGHT
                                    <SunIcon />
                                </>
                            )}
                        </ChangeTheme>
                    </Theme>

                    <Search
                        onSubmit={(e) => {
                            e.preventDefault();
                            hadleSubmit();
                        }}
                    >
                        <SearchLabel>
                            <SearchIcon />
                        </SearchLabel>

                        <Input
                            ref={usernameRef}
                            name="username"
                            id="username"
                            type="text"
                            placeholder="Search username ..."
                        />

                        {empty && <Warn>Enter User</Warn>}
                        {notFound && <Warn>Not Found</Warn>}

                        <Submit type="submit">Search</Submit>
                    </Search>
                </>
            )}
        </Container>
    );
};

const Container = styled.header`
    width: 100%;
    max-width: 73.3rem;
`;

const Loader = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Theme = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Warn = styled.small`
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 2.2rem;
    color: #f74646;
    margin-right: 2.4rem;
`;

const ChangeTheme = styled.button`
    display: flex;
    align-items: center;
    border: none;
    background: none;
    font-weight: bold;
    font-size: 1.6rem;
    line-height: 1.9rem;
    letter-spacing: 0.25rem;
    color: ${(props) => props.theme.colors.themeBtn};
    cursor: pointer;

    img {
        margin-left: 1.6rem;
    }
`;

const Search = styled.form`
    margin-top: 3.6rem;
    border-radius: 1.5rem;
    background: ${(props) => props.theme.colors.card};
    box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.198567);
    width: 100%;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.7rem 0.7rem 0.7rem 1.6rem;
    transition: height 0.3s ease;
    position: relative;

    @media (min-width: 768px) {
        height: 6.9rem;
    }
`;

const SearchLabel = styled.label`
    height: 2.4rem;
    cursor: pointer;
`;

const Input = styled.input`
    flex: 1;
    font-style: normal;
    font-weight: normal;
    font-size: 1.4rem;
    line-height: 192%;
    color: ${(props) => props.theme.colors.textNorm};
    background: none;
    border: none;
    margin: 0 0.8rem;

    @media (min-width: 768px) {
        font-size: 1.7rem;
        margin: 0 2.4rem;
    }

    &:focus {
        outline: 1px dashed #0079ff;
    }
`;

const Submit = styled.button`
    background: #0079ff;
    border: none;
    height: 100%;
    border-radius: 1rem;
    line-height: 2.1rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    width: 8.4rem;
    transition: all 0.3s ease-out;

    &:hover {
        filter: brightness(1.05);
        box-shadow: 0px 0px 15px -3px #0079ff;
    }

    @media (min-width: 768px) {
        width: 10.6rem;
        font-size: 1.7rem;
    }
`;
