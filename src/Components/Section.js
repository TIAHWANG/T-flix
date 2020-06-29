import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    &:not(:last-child) {
        margin-bottom: 40px;
    }
    color: white;
    width: 100%;
`;

const Title = styled.span`
    font-size: 20px;
    font-weight: 600;
`;

const Content = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Section = ({ title, children }) => (
    <Container>
        <Title>{title}</Title>
        <Content>{children}</Content>
    </Container>
);

Section.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default Section;
