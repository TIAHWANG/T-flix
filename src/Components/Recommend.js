import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
    transition: opacity 0.3s linear;
`;

const Rating = styled.span`
    position: absolute;
    bottom: 5px;
    right: 5px;
    opacity: 0;
    transition: opacity 0.3s linear;
`;

const ImageContainer = styled.div`
    margin-bottom: 5px;
    position: relative;
    &:hover {
        ${Image} {
            opacity: 0.5;
        }
        ${Rating} {
            opacity: 1;
        }
    }
`;

const Title = styled.span`
    display: block;
    margin-bottom: 2px;
`;

const Recommend = ({ id, imageUrl, title, rating, isMovie = false }) => (
    <Link to={isMovie ? `/movie/${id}` : `/tv/${id}`}>
        <Container>
            <ImageContainer>
                <Image bgUrl={imageUrl ? `https://image.tmdb.org/t/p/w300${imageUrl}` : require("../Assets/noPosterSmall.png")} />
                <Rating>
                    <span role="img" aria-label="rating">
                        ⭐️
                    </span>{" "}
                    {rating}/10
                </Rating>
            </ImageContainer>
            <Title>{title.length > 20 ? ` ${title.substring(0, 20)}...` : title}</Title>
        </Container>
    </Link>
);

Recommend.propTypes = {
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number,
    isMovie: PropTypes.bool,
};

export default Recommend;
