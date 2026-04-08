import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import '../App.css';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { userInfo, setCredentials } = useAuth();
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', { email, password });
      setCredentials(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 20px', minHeight: '80vh' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        
        <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: '2.5rem', textAlign: 'center', color: 'var(--charcoal)', marginBottom: '2rem' }}>
          Sign In
        </h1>

        {error && <div style={{ padding: '10px', backgroundColor: '#ffe6e6', color: '#cc0000', marginBottom: '1rem', borderLeft: '4px solid #cc0000' }}>{error}</div>}

        <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontFamily: 'var(--ff-body)', fontSize: '0.9rem', color: 'var(--charcoal)' }}>Email Address</label>
            <input 
              type="email" 
              placeholder="Enter email" 
              value={email} 
              required 
              onChange={(e) => setEmail(e.target.value)} 
              style={{ padding: '12px', border: '1px solid var(--border)', outline: 'none', fontFamily: 'var(--ff-body)' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontFamily: 'var(--ff-body)', fontSize: '0.9rem', color: 'var(--charcoal)' }}>Password</label>
            <input 
              type="password" 
              placeholder="Enter password" 
              value={password} 
              required 
              onChange={(e) => setPassword(e.target.value)} 
              style={{ padding: '12px', border: '1px solid var(--border)', outline: 'none', fontFamily: 'var(--ff-body)' }}
            />
          </div>

          <button type="submit" className="btn btn--primary" style={{ marginTop: '1rem', padding: '15px' }}>
            SIGN IN
          </button>

        </form>
      </div>
    </div>
  );
}