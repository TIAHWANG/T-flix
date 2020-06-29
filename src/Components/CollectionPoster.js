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
    width: 200px;
    transition: opacity 0.3s linear;
`;

const ImageContainer = styled.div`
    margin-bottom: 5px;
    position: relative;
    &:hover {
        ${Image} {
            opacity: 0.8;
        }
    }
`;

const Title = styled.span`
    display: block;
    margin-bottom: 2px;
`;

const CollectionPoster = ({ id, imageUrl, title }) => (
    <Link to={`/collection/${id}`}>
        <Container>
            <ImageContainer>
                <Image bgUrl={imageUrl ? `https://image.tmdb.org/t/p/w300${imageUrl}` : require("../Assets/noPosterSmall.png")} />
            </ImageContainer>
            <Title>{title.length > 28 ? ` ${title.substring(0, 28)}...` : title}</Title>
        </Container>
    </Link>
);

CollectionPoster.propTypes = {
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
};

export default CollectionPoster;
