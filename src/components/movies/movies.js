import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from '../base_components/header';

import Player from './ex';
function Movies()
{

    const location = useLocation();
    const state = location.state || {}; // provide an empty object as fallback
    const { id } = state;
    return (
        <>
        <Header></Header>
        
        <br></br>
       
            <Player />
        </>
    );
}

export default Movies;