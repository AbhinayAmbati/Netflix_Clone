import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

  const { id } = useParams();

  const navigate = useNavigate();
  
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzJmMGEwMzUzZTk5YzI2ODdkNzMzMmM3NjgyNjE1OCIsInN1YiI6IjY2NzMwZjViNDliODgzNWMwNzU5ZTBkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E9pur3jhU-227BFZHQp7KNvUI-khUWuKmwm--298Mqc'
    }
  };
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(response => {
        if (response.results && response.results.length > 0) {
          const videoData = response.results[0];
          setApiData({
            name: videoData.name || "",
            key: videoData.key || "",
            published_at: videoData.published_at || "",
            type: videoData.type || ""
          });
        } else {
          console.error('No video found for the given ID');
        }
      })
      .catch(err => console.error('Error fetching video data:', err));
  }, [id]);


  const handleBackClick = () => {
    navigate('/'); 
  };


  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={handleBackClick}/>
      {apiData.key ? (
        <iframe
          width='90%'
          height='90%'
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title='trailer'
          frameBorder='0'
          allowFullScreen
        ></iframe>
      ) : (
        <p>No video available</p>
      )}
      <div className="player-info">
        {apiData.published_at && <p>{apiData.published_at.slice(0, 10)}</p>}
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
}

export default Player;
