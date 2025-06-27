import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../services/supabase';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    }

    async function submitUser(e) {
        e.preventDefault();
        setError(null);

        const { data, error } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: user.password,
        });

        if (error) {
            setError('Email yoki parol noto‘g‘ri.');
        } else {
            navigate('/adminboard/main');
        }
    }

    return (
        <div className='login container'>
            <div className="login-board">
                <div className='board'>
                    <h1 className='login-title'>Admin</h1>
                    <form onSubmit={submitUser}>
                        <label>Email</label>
                        <input
                            placeholder='Emailingizni kiriting...'
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                        <label>Parol</label>
                        <input
                            placeholder='Parolingizni kiriting...'
                            type="password"
                            name="password"
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="login-btn">Yuborish</button>
                        {error && <p className="error">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}
