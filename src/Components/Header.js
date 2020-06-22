import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

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
    padding: ${(props) => props.theme.padding};
    z-index: 10;
    /* box-shadow: 0px 1px 5px 2px rgba(251, 187, 179, 0.8); */
`;

const List = styled.ul`
    display: flex;
`;

const ListItem = styled.li`
    width: 80px;
    height: 50px;
    text-align: center;
    border-bottom: 5px solid ${(props) => (props.current ? props.theme.lightBlueColor : "transparent")};
    transition: border-bottom 0.5s ease-in-out;
`;

const SLink = styled(Link)`
    width: 80px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default withRouter(({ location: { pathname } }) => (
    <Header>
        <List>
            <ListItem current={pathname === "/"}>
                <SLink to="/">Movies</SLink>
            </ListItem>
            <ListItem current={pathname === "/tv"}>
                <SLink to="/tv">TV</SLink>
            </ListItem>
            <ListItem current={pathname === "/search"}>
                <SLink to="/search">Search</SLink>
            </ListItem>
        </List>
    </Header>
));
