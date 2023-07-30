import { Link} from 'react-router-dom';
import { supabase } from '../../supabase/supbaseClient';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  async function handleSignUp(){
    try {
      const { user, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        throw new Error(error.message);
      }
      navigate("/")
    }
    catch(error){
      alert("Could not sign up "+error.message)
    }
  }
  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="Email" />
      </div>
      <div>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
      </div>
      <div>
        <button onClick={handleSignUp}>Sign Up</button>
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </div>
  );
};

export default SignUp;
