import axios from "axios";
import { useReducer } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router';
import { NavigateTo } from "../Components/Navigate";
import Slider from "../Components/Slider";

export default function Home() {
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
            <h2 className="greeting">Hi Name!</h2>
            <h3 className="greetingsmall">Let's listen to something new</h3>
            <section>
                <h2 className="section_big">Recently played</h2>
                <h3 className="section_small"></h3>
                { window.RecentlyPlayed != undefined ?
                    <Slider data={window.RecentlyPlayed}/>
                    :
                    ''
                }
            </section>
            <section>
                <h2 className="section_big">Recently played</h2>
                <h3 className="section_small"></h3>
                <Slider data={window.playlists}/>
            </section>
        </div>
    )
}