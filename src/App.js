import { Route, Routes, useNavigate} from 'react-router-dom';
import './App.css';
//import { Genre } from './Components/GenreToggle';
import Seasons from './Components/Seasons';
import HomePage from './Pages/HomePage';
import EpisodesList from './Components/EpisodesList';
import Login from './Components/authPages/Login';
import SignUp from './Components/authPages/SignUp';
import { supabase } from './supabase/supbaseClient';
import { useEffect, useState } from 'react'

function App() {
    const navigate = useNavigate()
    const [userEmail,setUserEmail]=useState('')
    useEffect(() => {
      // Check if a user is already authenticated
      async function checkSession(){
        const session = await supabase.auth.getSession();
        if(!session.data.session){
          navigate("/login")
       }
       else {
        setUserEmail(session.data.session.user.email)
       }
       
      }
    checkSession()
    },[])
  return ( <>
   <div style={{ position: 'absolute', top: '10px', right: '10px', border: '1px solid #fff', borderRadius: '4px' }}>
     <button>Sign Out</button>
     <p style={{fontWeight:"500 "}}>{userEmail}</p>
    </div>
  <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/Show' element={<Seasons/>}/>
    <Route path='/episodes' element={<EpisodesList/>}/>
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<SignUp/>} />
  </Routes>
  </> 
  );
}

export default App;
