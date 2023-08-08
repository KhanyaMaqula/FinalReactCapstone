import '../css/header.css'
import { supabase } from '../supabase/supbaseClient';
import { useNavigate } from 'react-router-dom';
const Header = ({ email }) => {
    const navigate = useNavigate()
    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error.message);
        } else {
            navigate('/login')
        }
    }



        return (
            <header className="header-sect">
                <div>
                    <input type="search" placeholder="search" />
                </div>
                <div>
                    <button onClick={handleSignOut}>Sign Out</button>
                    <p style={{ fontWeight: "500 " }}>{email}</p>
                </div>
            </header>
        )
    }

    export default Header;