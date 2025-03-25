/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
//import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import './App.css';


//import { Route, Routes } from 'react-router-dom';
import LoginPage from "./components/Login/LoginPage";
import Signup from "./components/Signup/Signup";
import NotificationPage from "./components/NotificationPage/NotificationPage";
import Profile from "./components/Profile/Profile";
import Advertisement from "./components/Advertisement/Advertisement";
import FindJob from "./components/FindJob/FindJob";
import FindExpert from "./components/FindExpert/FindExpert";
import CreateAd from "./components/CreateAd/CreateAd";
import CreatePost from "./components/CreatePost/CreatePost";
import ProfileEdit from "./components/ProfileEdit/ProfileEdit";
import OfferJobPage from './components/OfferJob/OfferJobPage';


import {
    advertisement_route,
    create_ad_route,
    create_post_route,
    expert_route,
    job_route,
    login_route,
    notification_route,
    profile_edit_route,
    profile_route,
    signup_route,
    offer_job_route,
    create_review
} from "./components/Routing/Routes";
import CreateReviewPage from './components/CreateReview/CreateReviewPage';


function App (){
    return (
        <BrowserRouter>
            <Routes>
                <Route path={login_route} element={<LoginPage />} />
                <Route path={signup_route} element={<Signup />} />
                {/*<Route path="/register" element={<Signup />} />*/}

                <Route path={`${advertisement_route}/:adId`} element={<Advertisement />}/>
                {/*loader={({ params }) => {*/}
                {/*console.log(params.adId); // "hotspur"*/}

                {/*<Route path={advertisement_route} element={<div />} />*/}
                {/*<Route path="/advertisement/:id" element={<Advertisement />} />*/}

                <Route path={`${profile_route}/:id?`} element={<Profile />} />
                <Route path={`${offer_job_route}/:receiverId`} element={<OfferJobPage />} />

                {/*<Route path={profile_route} element={<Profile />} />*/}
                <Route path={create_ad_route} element={<CreateAd />} />
                <Route path={create_post_route} element={<CreatePost />} />
                <Route path={expert_route} element={<FindExpert />} />
                <Route path={job_route} element={<FindJob />} />
                <Route path={profile_edit_route} element={<ProfileEdit />} />
                <Route path={notification_route} element={<NotificationPage />} />
                <Route path={`${create_review}/:reviewAdid`} element={<CreateReviewPage />} />

            </Routes>
        </BrowserRouter>
    );
    
}

export default App;

//function App() {
//    const [forecasts, setForecasts] = useState();

//    useEffect(() => {
//        populateWeatherData();
//    }, []);

//    const contents = forecasts === undefined
//        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
//        : <table className="table table-striped" aria-labelledby="tabelLabel">
//            <thead>
//                <tr>
//                    <th>Date</th>
//                    <th>Temp. (C)</th>
//                    <th>Temp. (F)</th>
//                    <th>Summary</th>
//                </tr>
//            </thead>
//            <tbody>
//                {forecasts.map(forecast =>
//                    <tr key={forecast.date}>
//                        <td>{forecast.date}</td>
//                        <td>{forecast.temperatureC}</td>
//                        <td>{forecast.temperatureF}</td>
//                        <td>{forecast.summary}</td>
//                    </tr>
//                )}
//            </tbody>
//        </table>;

//    return (
//        <div>
//            <h1 id="tabelLabel">Weather forecast</h1>
//            <p>This component demonstrates fetching data from the server.</p>
//            {contents}
//        </div>
//    );

//    async function populateWeatherData() {
//        const response = await fetch('weatherforecast');
//        const data = await response.json();
//        setForecasts(data);
//    }
//}

//export default App;



//import "./custom.css";
//import { BrowserRouter, Route } from "react-router-dom";
//import Router from "./components/Routing/Router";
//import LoginPage from "./components/Login/LoginPage";

//function App() {
//    return (
//        <BrowserRouter>
//            <Router>
//                <Route path="/login" element={LoginPage} />
//            </Router>
//        </BrowserRouter>
//    );
//}

//export default App;