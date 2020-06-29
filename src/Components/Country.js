import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const FatText = styled.div`
    font-weight: 600;
    font-size: 16px;
    color: ${(props) => props.theme.pinkColor};
    border-radius: 50%;
    border: 1px solid ${(props) => props.theme.pinkColor};
    margin-right: 10px;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Name = styled.div`
    line-height: 1.2;
    font-size: 12px;
    width: 55%;
    text-align: left;
`;

const Country = ({ id, name }) => (
    <Container>
        <FatText>{id}</FatText>
        <Name>{name}</Name>
    </Container>
);

Country.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default Country;
