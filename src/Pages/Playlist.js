import axios from "axios";
import { useReducer } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router';
import { NavigateTo } from "../Components/Navigate";
import Slider from "../Components/Slider";

export default function Playlist() {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const navigate = useNavigate();

    useEffect(() => {
        window.GoBack = () => {
            NavigateTo(navigate, -1)
        }
        forceUpdate();
        setTimeout(() => {
            window.ready = true;
            forceUpdate();
        }, 3000)
    }, [])
    return (
        <div className="Page Home">
            <div className="gradient"/>
            <Slider data={window.playlists}/>
            <Slider data={window.playlists}/>
            <Slider data={window.playlists}/>
            <Slider data={window.playlists}/>
            <Slider data={window.playlists}/>
            <Slider data={window.playlists}/>
            <Slider data={window.playlists}/>
            <Slider data={window.playlists}/>
            <Slider data={window.playlists}/>
            <Slider data={window.playlists}/>
            <Slider data={window.playlists}/>
            <Slider data={window.playlists}/>
            <Slider data={window.playlists}/>
            <Slider data={window.playlists}/>
            <Slider data={window.playlists}/>
            <Slider data={window.playlists}/>
            <Slider data={window.playlists}/>
        </div>
    )
}