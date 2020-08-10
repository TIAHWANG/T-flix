import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const Text = styled.span`
    color: ${(props) => props.theme.pinkColor};
    font-weight: 600;
    font-size: 18px;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        padding: 16px;
    }
`;

const Message = ({ text }) => (
    <Container>
        <Text>{text}</Text>
    </Container>
);

Message.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Message;
