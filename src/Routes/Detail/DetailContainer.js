import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
    constructor(props) {
        super(props);
        const {
            location: { pathname },
        } = props;
        this.state = {
            result: null,
            staff: null,
            recommend: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/"),
        };
    }

    getMovieData = async () => {
        const {
            match: {
                params: { id },
            },
            history: { push },
        } = this.props;
        const { isMovie } = this.state;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push("/");
        }
        let result = null;
        let staff = null;
        let recommend = null;
        try {
            if (isMovie) {
                ({ data: result } = await moviesApi.movieDetail(parsedId));
                ({ data: staff } = await moviesApi.movieCast(parsedId));
                ({ data: recommend } = await moviesApi.recommendMovie(parsedId));
            } else {
                ({ data: result } = await tvApi.showDetail(parsedId));
                ({ data: staff } = await tvApi.tvCast(parsedId));
                ({ data: recommend } = await tvApi.recommendTv(parsedId));
            }
        } catch {
            this.setState({
                error: "Can't find anything.",
            });
        } finally {
            this.setState({
                loading: false,
                result,
                staff,
                recommend,
            });
        }
    };

    componentDidMount() {
        this.getMovieData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.getMovieData();
        }
    }
    render() {
        const { result, staff, recommend, error, loading } = this.state;
        console.log(result);
        return <DetailPresenter result={result} staff={staff} recommend={recommend} error={error} loading={loading} />;
    }
}
