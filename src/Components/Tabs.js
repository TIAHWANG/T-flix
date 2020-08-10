import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Tab from "./Tab";

const TabList = styled.ul`
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0px;
`;

export default class extends React.Component {
    static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            activeTab: this.props.children[0].props.label,
        };
    }

    onClickTabItem = (tab) => {
        this.setState({ activeTab: tab });
    };

    render() {
        const {
            onClickTabItem,
            props: { children },
            state: { activeTab },
        } = this;

        return (
            <>
                <>
                    {children.map((child) => {
                        if (child.props.label !== activeTab) return undefined;
                        return child.props.children;
                    })}
                </>
                <TabList>
                    {children.map((child) => {
                        const { label } = child.props;
                        return (
                            <Tab
                                activeTab={activeTab}
                                key={label}
                                label={label}
                                onClick={onClickTabItem}
                            />
                        );
                    })}
                </TabList>
            </>
        );
    }
}
