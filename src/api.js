import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
});

api.interceptors.request.use((config) => {
    config.params = config.params || {};
    config.params["api_key"] = "1f76b07ff6c77afe1ce9a752c92b8290";
    config.params["language"] = "en-US";
    return config;
});

export const moviesApi = {
    nowPlaying: () => api.get("movie/now_playing"),
    upcoming: () => api.get("movie/upcoming"),
    popular: () => api.get("movie/popular"),
    movieDetail: (id) =>
        api.get(`movie/${id}`, {
            params: {
                append_to_response: "videos",
            },
        }),
    searchMovie: (term) =>
        api.get("search/movie", {
            params: {
                query: encodeURIComponent(term),
            },
        }),
};

export const tvApi = {
    topRated: () => api.get("tv/top_rated"),
    popular: () => api.get("tv/popular"),
    airingToday: () => api.get("tv/airing_today"),
    showDetail: (id) =>
        api.get(`tv/${id}`, {
            params: {
                append_to_response: "videos",
            },
        }),
    searchTv: (term) =>
        api.get("search/tv", {
            params: {
                query: encodeURIComponent(term),
            },
        }),
};