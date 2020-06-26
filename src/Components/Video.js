import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const Item = styled.iframe`
    width: 100%;
    margin-bottom: 5px;
    background-color: rgba(0, 0, 0, 0.8);
`;

const Name = styled.span`
    font-size: 10px;
`;

const Video = ({ id, videoUrl, name }) => (
    <Container>
        <Item id={id} allowfullscreen frameborder="0" src={`https://www.youtube.com/embed/${videoUrl}`} />
        <Name>{name}</Name>
    </Container>
);

Video.propTypes = {
    id: PropTypes.string.isRequired,
    videoUrl: PropTypes.string.isRequired,
    name: PropTypes.string,
};

export default Video;
