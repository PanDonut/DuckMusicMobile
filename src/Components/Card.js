import { useState } from "react"
import { useNavigate } from "react-router";
import { NavigateTo } from "./Navigate";

export default function Card({data}) {
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    return (
        <div className='Card' onClick={() => {NavigateTo(navigate, `/playlist/${data.link}`)}}>
                <>
                <div className={`img ${loaded == false ? "ImageLoad" : ""}`}>
                    <img onLoad={() => {
                        setTimeout(() => {
                            setLoaded(true);
                            caches.open("music_covers").then(cache => {
                                cache.add(data.imgUrl)
                            })
                        }, 500)                   
                    }} src={data.imgUrl} loading="lazy" />
                    {
                        loaded == false ?
                        <svg width="64px" height="64px" viewBox="0 0 64 64"><path d="M25.386 2v36.721c-1.249-.406-3.727-.629-5.163-.629c-13.631 0-13.631 16.59 0 16.59c5.856 0 11.715-3.715 11.715-8.295V25.781L47.448 31v15.037c-1.249-.404-3.727-.629-5.163-.629c-13.631 0-13.631 16.592 0 16.592C48.142 62 54 58.287 54 53.705V11.442L25.386 2m22.062 21.518l-15.511-5.309v-6.291l15.511 5.367v6.233" fill="#171717"></path></svg>
                        :
                        ''
                    }
                </div>                
                <h4 className="h4" style={{opacity: loaded == false ? 0 : 1}}>{data.title}</h4>
                </>
        </div>
    )
}