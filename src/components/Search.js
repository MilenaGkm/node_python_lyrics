import React, { useState } from 'react'
const axios = require('axios');
// const {spawn} = require('child_process');


export default function Search() {
    const [inputResults, setInputResults] = useState([])
    const [lyricsResults, setLyricsResults] = useState("")
    const [lyricCount, setLyricCount] = useState([])

    const searchTrack = async (e) => {
        if (e.code === "Enter") {
            console.log(e.target.value);
            const tracks = await axios.get(`https://api.happi.dev/v1/music?q=${e.target.value}%20&limit=10&apikey=ab8c67S3uxdD6XyMHg7F5NvOAdAMlLAjoP2MhWV6NRvtg5A6fvthuk6w&type=&lyrics=1`)
            // console.log(tracks);
            console.log(tracks.data.result);
            setInputResults(tracks.data.result)
            // const songs = await tracks.data.map(t => new Track(t.id, t.name, t.artists, t.album.images[1].url, t.preview_url))

        }
        // const search = await axios.get(`https://api.happi.dev/v1/music?q=${input}%20&limit=10&apikey=ab8c67S3uxdD6XyMHg7F5NvOAdAMlLAjoP2MhWV6NRvtg5A6fvthuk6w&type=&lyrics=1`)
    }

    const searchLyrics = async (e) => {
        const lyrics = await axios.get(`${e}?apikey=ab8c67S3uxdD6XyMHg7F5NvOAdAMlLAjoP2MhWV6NRvtg5A6fvthuk6w`)
        setLyricsResults(lyrics.data.result.lyrics)
        
        // lyrics.data.result.lyrics
        const lyricData = lyrics.data.result
        const lyricsP = await axios.post(`http://localhost:3001/lyric`, lyricData)
        setLyricCount(lyricsP.data)
    }

    return (
        <div>
            <input placeholder="Enter track title" onKeyPress={searchTrack} ></input>
            {inputResults.length > 0 ?  <div className="tracks">
                {inputResults.map((t, i) => {
                    return (
                        <div className="track" key={i} onClick={() => searchLyrics(t.api_lyrics)}>
                            <h4>{t.track}</h4>
                            <img className="trackImg" height="120px" src={t.cover} alt="" />
                            <div> by {t.artist}</div>
                            <br />
                        </div>
                    )
                })}
            </div> : null}
            
            {lyricsResults.length > 0 ? <div >{lyricsResults}</div> : null}
            <br />
            {lyricCount.length > 0 ? <div className="lyricsCount">
                {lyricCount.map((l, i) => {
                    return (
                        <div>{l}.</div>
                    )
                })} </div> : null}
        </div>
    )
}