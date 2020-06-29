import React from "react";
import CollectionPresenter from "./CollectionPresenter";
import { moviesApi } from "../../api";

export default class extends React.Component {
    state = {
        collection: null,
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
            const { data: collection } = await moviesApi.movieCollection(parsedId);
            this.setState({
                collection,
            });
        } catch {
            this.setState({ error: "Can't find anything" });
        } finally {
            this.setState({ loading: false });
        }
    }
    render() {
        const { collection, error, loading } = this.state;
        console.log(collection);
        return <CollectionPresenter collection={collection} error={error} loading={loading} clickImage={this.clickImage} />;
    }
}
