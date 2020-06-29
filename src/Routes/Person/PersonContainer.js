import React from "react";
import PersonPresenter from "./PersonPresenter";
import { personApi } from "../../api";

export default class extends React.Component {
    state = {
        person: null,
        error: null,
        loading: true,
    };
    async componentDidMount() {
        const {
            match: {
                params: { id },
            },
            history: { push },
        } = this.props;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push("/");
        }
        try {
            const { data: person } = await personApi.person(parsedId);
            this.setState({
                person,
            });
        } catch {
            this.setState({ error: "Can't find actor information" });
        } finally {
            this.setState({ loading: false });
        }
    }

    render() {
        const { person, error, loading } = this.state;
        return <PersonPresenter person={person} error={error} loading={loading} />;
    }
}
