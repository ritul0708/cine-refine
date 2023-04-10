import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";

import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import ProtectedRoute from "./utils/protectedRoutes";

function App() {
    const dispatch = useDispatch();
    const { url } = useSelector((state) => state.home);
    console.log(url);

    useEffect(() => {
        fetchApiConfig();
        genresCall();
    }, []);

    const fetchApiConfig = () => {
        fetchDataFromApi("/configuration").then((res) => {
            console.log(res);

            const url = {
                backdrop: res.images.secure_base_url + "original",
                poster: res.images.secure_base_url + "original",
                profile: res.images.secure_base_url + "original",
            };

            dispatch(getApiConfiguration(url));
        });
    };

    const genresCall = async () => {
        let promises = [];
        let endPoints = ["tv", "movie"];
        let allGenres = {};

        endPoints.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`));
        });

        const data = await Promise.all(promises);
        console.log(data);
        data.map(({ genres }) => {
            return genres.map((item) => (allGenres[item.id] = item));
        });

        dispatch(getGenres(allGenres));
    };

    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/login" component={Login} />
                <ProtectedRoute exact path="/" element={<Home />} />
                <ProtectedRoute exact path="/:mediaType/:id" element={<Details />} />
                <ProtectedRoute exact path="/search/:query" element={<SearchResult />} />
                <ProtectedRoute exact path="/explore/:mediaType" element={<Explore />} />
                <ProtectedRoute exact path="*" element={<PageNotFound />} />
            </Switch>
            <Logout />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
