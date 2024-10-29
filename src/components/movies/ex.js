
import React, {useRef, useEffect} from 'react'

const VideoPlayer = () => {
    const videoRef = useRef(null)
    const IP=process.env.REACT_APP_IP;

    useEffect(()=>{
        if(videoRef.current){
            videoRef.current.pause()
            videoRef.current.removeAttribute('src')
            videoRef.current.load()
        }
    })
  return (
    <video ref={videoRef} width='100%' height='20%' controls autoPlay>
            <source src={`${IP}/movie`} type='video/mp4' />
            Your browser does not support the video tag.
        </video>
  )
}

export default VideoPlayer
