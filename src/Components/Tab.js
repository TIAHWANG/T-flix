import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TabList = styled.li`
    padding-bottom: 7px;
    cursor: pointer;
    transition: border-bottom 0.5s ease-in-out;
`;

const TabListName = styled.div``;

export default class extends React.Component {
    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    onClick = () => {
        const { label, onClick } = this.props;
        onClick(label);
    };

    render() {
        const {
            onClick,
            props: { activeTab, label },
        } = this;

        return (
            <TabList style={{ borderBottom: `5px solid ${activeTab === label ? "#f9d7d6" : "transparent"}` }} onClick={onClick}>
                <TabListName>{label}</TabListName>
            </TabList>
        );
    }
}
