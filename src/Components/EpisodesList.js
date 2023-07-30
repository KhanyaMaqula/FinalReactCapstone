import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import playIcon from '../Images/media-player-icon-4.jpg'
import AudioPlayer from './audio_controls';
import { useAudioPlayer } from './contexts/AudioContext';

const EpisodesList = () => {
    const { state } = useLocation();
    const [episodes, setEpisodes] = useState([]);
    const { play, setPlay } = useAudioPlayer();
    //const [currentEpisode, setCurrentEpisode] = useState(null);

    useEffect(() => {
        if (state && state.seasonEpisodes) {
            setEpisodes(state.seasonEpisodes);
        }
    }, [state]);

       
   function handlePlay(){
    if(play){
        setPlay(false)
        setTimeout(function(){
            setPlay(true)
        },2000)
    }
    else{
        setPlay(true)
    }
   }

    return (
        <div className="episode-list-container" style={{overflowY:"auto", height:'80vh'}}>
            {episodes.map((episode) => (
                <>
                <Card key={episode.id} className="episode-card" style={{border:"1px solid #fff"}} onClick={handlePlay}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <img src={playIcon} width={80} height={80}/>
                        <Card.Title>{episode.title}</Card.Title>
                    </div>
                </Card>
                {play ? <AudioPlayer currentEpisode={episode} style={{height:'20vh'}}/>: <></>}
                </>
            ))}
            
        </div>

    );
};

export default EpisodesList;
