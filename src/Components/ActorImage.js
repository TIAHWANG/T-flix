import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
    margin-bottom: 5px;
    &:not(:last-child) {
        margin-right: 5px;
    }
    cursor: pointer;
`;

const Image = styled.div`
    background-image: url(${(props) => props.bgUrl});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 100px;
    height: 150px;
    border-radius: 5px;
`;

const ActorImage = ({ id, imageUrl, onClick }) => (
    <Container>
        <Image onClick={onClick} bgUrl={`https://image.tmdb.org/t/p/original${imageUrl}`} />
    </Container>
);

ActorImage.propTypes = {
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
};

export default ActorImage;
