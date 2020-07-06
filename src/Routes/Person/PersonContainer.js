import React from "react";
import PersonPresenter from "./PersonPresenter";
import { personApi } from "../../api";

export default class extends React.Component {
    state = {
        person: null,
        error: null,
        loading: true,
        imageUrl: require("../../Assets/noActor.png"),
        backDropUrl: null,
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
                imageUrl: `https://image.tmdb.org/t/p/original${person.profile_path}`,
                backDropUrl: `https://image.tmdb.org/t/p/original${person.profile_path}`,
            });
        } catch {
            this.setState({ error: "Can't find actor information" });
        } finally {
            this.setState({ loading: false });
        }
    }

    imageClick = (path) => {
        if (window.innerWidth <= 992) {
            return () => {
                console.log("YAH");
                this.setState({
                    backDropUrl: `https://image.tmdb.org/t/p/original${path}`,
                });
            };
        } else {
            return () => {
                this.setState({
                    imageUrl: `https://image.tmdb.org/t/p/original${path}`,
                });
            };
        }
    };

    render() {
        const { person, error, loading, imageUrl, backDropUrl } = this.state;
        return (
            <PersonPresenter
                person={person}
                error={error}
                loading={loading}
                imageUrl={imageUrl}
                imageClick={this.imageClick}
                backDropUrl={backDropUrl}
            />
        );
    }
}
