import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    font-size: 12px;
`;

const Image = styled.div`
    background-image: url(${(props) => props.bgUrl});
    background-size: cover;
    background-position: center center;
    border-radius: 4px;
    height: 180px;
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

const Year = styled.span`
    font-size: 10px;
    color: rgba(0, 0, 0, 0.5);
`;

const Poster = ({ id, imageUrl, title, rating, year, isMovie = false }) => (
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
            <Title>{title.length > 18 ? ` ${title.substring(0, 18)}...` : title}</Title>
            <Year>{year}</Year>
        </Container>
    </Link>
);

Poster.propTypes = {
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number,
    year: PropTypes.string,
    isMovie: PropTypes.bool,
};

export default Poster;
