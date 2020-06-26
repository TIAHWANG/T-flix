import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const Logo = styled.div`
    background-image: url(${(props) => props.bgUrl});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    width: 80px;
    height: 80%;
    margin-bottom: 10px;
`;

const Name = styled.span`
    line-height: 1.2;
    font-size: 10px;
`;

const Company = ({ id, name, logoUrl }) => (
    <Container>
        <Logo bgUrl={logoUrl ? `https://image.tmdb.org/t/p/original${logoUrl}` : require("../Assets/noLogo.png")} />
        <Name>{name}</Name>
    </Container>
);

Company.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    logoUrl: PropTypes.string,
};

export default Company;
