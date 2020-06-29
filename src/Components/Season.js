import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    height: 280px;
    color: white;
    margin-right: 10px;
    font-size: 12px;
`;

const Image = styled.div`
    background-image: url(${(props) => props.bgUrl});
    background-size: cover;
    background-position: center center;
    border-radius: 4px;
    height: 250px;
    width: 150px;
    transition: opacity 0.3s linear;
`;

const ImageContainer = styled.div`
    margin-bottom: 5px;
    position: relative;
    &:hover {
        ${Image} {
            opacity: 0.5;
        }
    }
`;

const Title = styled.span`
    display: block;
    margin-bottom: 2px;
`;

const Season = withRouter(({ match: { url }, id, imageUrl, seasonNum, title }) => {
    return (
        <Link to={`${url}/season/${id}/${title}`}>
            <Container>
                <ImageContainer>
                    <Image bgUrl={imageUrl ? `https://image.tmdb.org/t/p/w300${imageUrl}` : require("../Assets/noPosterSmall.png")} />
                </ImageContainer>
                <Title>{seasonNum.length > 28 ? ` ${seasonNum.substring(0, 28)}...` : seasonNum}</Title>
            </Container>
        </Link>
    );
});

Season.propTypes = {
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    seasonNum: PropTypes.string,
    title: PropTypes.string,
};

export default Season;
