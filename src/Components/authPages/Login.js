import { Link, useNavigate} from 'react-router-dom';
import { supabase } from '../../supabase/supbaseClient';
import { useState } from 'react';

function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  async function handleLogin(){
    try{
      const {user, error} = await supabase.auth.signInWithPassword({email,password})
      if(error){
        throw new Error(error.message)
      }
      navigate("/")
    }
    catch(error){
      alert("Error signing in "+error.message)
    }
    
  }

  return (
     <div>
      <h1>Login</h1>
      <div>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      </div>
      <div>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
        <Link to="/signup">Don't have an account? Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
