import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
    width: 100%;
    padding-bottom: 10px;
    &:not(:last-child) {
        border-bottom: 1px solid ${(props) => props.theme.pinkColor};
    }
    &:not(:first-child) {
        padding-top: 10px;
    }
    display: flex;
`;

const Column = styled.div`
    display: flex;
    &:first-child {
        justify-content: flex-start;
    }
    &:last-child {
        justify-content: flex-end;
    }
`;

const Data = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: 600;
    line-height: 1.5;
    margin-bottom: 10px;
`;

const ItemTitle = styled.div`
    font-weight: 600;
    margin-bottom: 10px;
    opacity: 0.9;
`;

const Item = styled.p`
    width: 95%;
    opacity: 0.7;
    margin-bottom: 10px;
`;

const Image = styled.div`
    background-image: url(${(props) => props.bgUrl});
    background-size: cover;
    background-position: center center;
    border-radius: 4px;
    height: 250px;
    width: 100%;
`;

const Episode = ({ id, imageUrl, overview, date, title }) => (
    <Container>
        <Column style={{ width: "70%" }}>
            <Data>
                <Title>
                    {`Episode ${id}`}: {title}
                </Title>
                <ItemTitle>Overview</ItemTitle>
                <Item>{overview}</Item>
                <ItemTitle>AirDate</ItemTitle>
                <Item>{date}</Item>
            </Data>
        </Column>
        <Column style={{ width: "30%" }}>
            <Image bgUrl={imageUrl ? `https://image.tmdb.org/t/p/original${imageUrl}` : require("../Assets/noPosterSmall.png")} />
        </Column>
    </Container>
);

Episode.propTypes = {
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    overview: PropTypes.string,
    date: PropTypes.string,
    title: PropTypes.string,
};

export default Episode;
