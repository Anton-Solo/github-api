import styled from "styled-components";
import { ThemeContextProvider } from "./context/ThemeContext.tsx";
import { Header } from "./components/Header";
import { useState } from "react";
import { IUserResponse } from "./types";
import { Card } from "./components/Card";

function App() {
    const [user, setUser] = useState<IUserResponse | null>(null);

    const setUserData = (user: IUserResponse | null): void => {
        setUser(user);
    };

    return (
        <ThemeContextProvider>
            <Container>
                <Header setUser={setUserData} />
                {user && <Card user={user} />}
            </Container>
        </ThemeContextProvider>
    );
}

const Container = styled.main`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.theme.colors.background};
    padding: 0rem 2.5rem;

    @media (min-width: 768px) {
        padding: 0rem 7rem;
    }
`;

export default App;
