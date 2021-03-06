import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
    }
    body {
        font-size: 14px;
        font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding-top: 50px;
        background-color: ${(props) => props.theme.black};
        color: white;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
`;
