import { useEffect,useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const [name,setname]=useState('');
  const [email,setemail]=useState('');
  const [pass,setpass]=useState('');
  const [submit,setsubmit]=useState(false);

  const navigate = useNavigate();

  const IP=process.env.REACT_APP_IP;


  useEffect(()=>{

    if(submit){
           var data={
             name:name,
             email:email,
             pass_code:pass
           };
           send(data);
           setsubmit(!submit);
        }
  },[submit]);

  async function send(data)
  {
    console.log(data);
    try {
            const response = await fetch(`${IP}/login`, {
              method: 'POST',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          });
        
          if (response.ok) {
              const jsonResponse = await response.json();
              console.log('Response from server:', jsonResponse);
              if(jsonResponse.message)
              {
                navigate('/');
              }
              else
              {
                window.alert("User Not Found click ok to signup");
                navigate('/sign_up');
              }
              
            } else {
              console.error('Server error:', response.statusText);
          }
    } catch (error) {
            console.error('Fetch error:', error);
      }
  }
  return (
    <div className="login">
          <img src={`https://cdn.pixabay.com/animation/2023/10/10/13/26/13-26-07-593_512.gif`} alt="Description of my image" />

        <div id="form">
          <div className='input'>
          <h1>LOGIN</h1>
          </div>

          <div className='input'>
          <h3>Name:</h3>
          <input type="text" name="name" placeholder='enter your name' onChange={(e)=>setname(e.target.value)}></input>
          </div>

          <div className='input'>
          <h3>Email:</h3>
          <input type="text" name="name" placeholder='enter your Email' onChange={(e)=>setemail(e.target.value)}>

          </input>
          </div>

          <div className='input'>
          <h3>Password:</h3>
          <input type="text" name="name" placeholder='enter your Password' onChange={(e)=>setpass(e.target.value)}>

          </input>
          </div>

        <button onClick={(e)=>setsubmit(!submit)}>submit</button>
        <br></br>
        <a href="/sign_up">Not yet registered</a>
        </div>
    </div>
  );
}

export default App;
