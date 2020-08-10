import React from "react";
import styled from "styled-components";
import { Link, useLocation, useHistory } from "react-router-dom";

const Header = styled.header`
    background-color: ${(props) => props.theme.black};
    height: 50px;
    width: 100%;
    color: white;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    position: fixed;
    top: 0%;
    left: 0;
    display: flex;
    align-items: center;
    padding: 20px;
    z-index: 10;
    /* box-shadow: 0px 1px 5px 2px rgba(251, 187, 179, 0.8); */
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        font-size: 14px;
    }
`;
const LogoContainer = styled(Link)`
    width: 100px;
    height: 50px;
    padding-top: 2px;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        width: 80px;
        margin-right: 15px;
    }
`;

const Logo = styled.div`
    background-image: url(${(props) => props.bgUrl});
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    width: 80px;
    height: 50px;
`;

const List = styled.ul`
    display: flex;
`;

const ListItem = styled.li`
    width: 80px;
    height: 50px;
    text-align: center;
    border-bottom: 5px solid ${(props) => (props.current ? props.theme.pinkColor : "transparent")};
    transition: border-bottom 0.5s ease-in-out;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        width: 60px;
    }
`;

const SLink = styled(Link)`
    width: 80px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        width: 60px;
    }
`;

export default () => {
    const { pathname } = useLocation();

    return (
        <Header>
            <LogoContainer to="/">
                <Logo bgUrl={require("../Assets/mainLogo.png")} />
            </LogoContainer>
            <List>
                <ListItem current={pathname === "/" || pathname.includes("movie")}>
                    <SLink to="/">Movies</SLink>
                </ListItem>
                <ListItem current={pathname === "/tv" || pathname.includes("tv")}>
                    <SLink to="/tv">TV</SLink>
                </ListItem>
                <ListItem current={pathname === "/search"}>
                    <SLink to="/search">Search</SLink>
                </ListItem>
            </List>
        </Header>
    );
};
