import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    &:not(:last-child) {
        margin-bottom: 40px;
    }
    color: white;
`;

const Title = styled.span`
    font-weight: 600;
`;

const Grid = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 125px);
    grid-gap: 25px;
`;

const Section = ({ title, children }) => (
    <Container>
        <Title>{title}</Title>
        <Grid>{children}</Grid>
    </Container>
);

Section.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default Section;
