import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "Styles/GlobalStyles";
import Theme from "Styles/Theme";
import Router from "Components/Router";
import Header from "Components/Header";

export default () => (
    <ThemeProvider theme={Theme}>
        <>
            <GlobalStyles />
            <Header />
            <Router />
        </>
    </ThemeProvider>
);
