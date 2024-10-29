import React, { useState, useEffect } from "react";
import './single_card.css';
import { useNavigate } from 'react-router-dom';

function Card({ id }) {

  const navigate = useNavigate();

  const [value, setValue] = useState(5);
  const IP=process.env.REACT_APP_IP;
  // Handler to update the value
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [data, setData] = useState({});

  useEffect(() => {
    getData();
  }, [id]);


  async function getData() {
    try {
      const response = await fetch(`${IP}/sub_main`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('Response from server:', jsonResponse);

        setData(jsonResponse);
        
        
      } else {
        console.error('Server error:', response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }



  async function response(options)
  {
    try {

      var data={movie_id:id,options:options,review:value};
      const response = await fetch(`${IP}/watch_later`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        if(jsonResponse.message)
        {
          if(jsonResponse.options==='watch_later')
          {window.alert("Added to WatchList");}

          else if(jsonResponse.options==='ratings')
          {window.alert("Review updated");}

          else if(jsonResponse.options==='watch_now')
            {navigate('/movies/',{ state: { id:id } });}
          
        }
        else{
          navigate('/login');
        }
        
      } else {
        console.error('Server error:', response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  
  return (
    <div id="main">
      
      <img src={'movies/'+data.Genere+'/'+data.img} alt="Person" className="sub_gal_img"/>
            <div id="main_det">
            <div id="details">

              <h1>{data.name}</h1>
              <h2><span>Movie Name :</span>{data.name} </h2>
              <br></br>
              <h2><span>Category :</span>{data.Genere} </h2>
              <br></br>
              <h2><span>Ratings :</span>{data.ratings / ((data.No_reviews >= 1)?data.No_reviews:1)}</h2>
              <br></br>
              <h2><span>Reviews :</span>Good</h2>
              <br></br>
              <h2><span>Releas Date :</span>10/11/2024</h2>
              <br></br>
              <h2><span>Give your Ratings :</span>  {value}
              <input type="range" min="0" max="5" style={{width: '50%' }} value={value} onChange={handleChange}/> </h2> 
              
              <div id="cart_btns">
                  <button onClick={() => response('ratings')}>save-ratings</button>
                  <button onClick={() => response('watch_now')}>Watch Now</button>
                  <button  onClick={() => response('watch_later')}>Watch Later</button>
              </div>
             
            
        </div>

        <div id="description">
          <center><h2><span>Description</span></h2></center>
            <h2 id="desc_">{data.description}</h2>
          
            <center><h2><span>Cast</span></h2></center>

            <div id="cast_imgs">
            {data.cast && Object.entries(data.cast).map(([name, imgSrc]) => (
            <div key={name} className="cast_member">
              <img src={'/' + imgSrc} alt={name} className="cast_img" />
              <p>{name}</p>
            </div>
          ))}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
