import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    &:not(:last-child) {
        margin-bottom: 40px;
    }
    color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        &:not(:last-child) {
            margin-bottom: 20px;
        }
    }
`;

const TitleContainer = styled.div`
    display: inline-block;
    width: 50%;
    position: relative;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: 600;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_TABLET}) {
        font-size: 20px;
    }
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        font-size: 16px;
    }
`;

const ArrowContainer = styled(Link)``;

const Arrow = styled.svg`
    fill: ${(props) => props.theme.pinkColor};
    margin-left: 10px;
    position: absolute;
    bottom: 2px;
    cursor: pointer;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_TABLET}) {
        width: 15px;
        height: 15px;
    }
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        width: 12px;
        height: 12px;
        position: absolute;
        bottom: 1px;
    }
`;

const Content = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Section = ({ title, name, children, isMovie = true, isVisible = true }) => (
    <Container>
        <TitleContainer>
            <Title>
                {title}
                {isVisible && (
                    <ArrowContainer to={isMovie ? `/movie/list/${name}` : `/tv/list/${name}`}>
                        <Arrow xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                            <path d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z" />
                        </Arrow>
                    </ArrowContainer>
                )}
            </Title>
        </TitleContainer>
        <Content>{children}</Content>
    </Container>
);

Section.propTypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    isMovie: PropTypes.bool,
    isVisible: PropTypes.bool,
};

export default Section;
