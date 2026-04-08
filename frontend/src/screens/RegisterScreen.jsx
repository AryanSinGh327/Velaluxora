import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import '../App.css';

export default function RegisterScreen() {
  const [name, setName] = useState('');
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
      const { data } = await axios.post('/api/users', { name, email, password });
      setCredentials(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong during registration');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 20px', minHeight: '80vh' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        
        <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: '2.5rem', textAlign: 'center', color: 'var(--charcoal)', marginBottom: '2rem' }}>
          Create Account
        </h1>

        {error && <div style={{ padding: '10px', backgroundColor: '#ffe6e6', color: '#cc0000', marginBottom: '1rem', borderLeft: '4px solid #cc0000' }}>{error}</div>}

        <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontFamily: 'var(--ff-body)', fontSize: '0.9rem', color: 'var(--charcoal)' }}>Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              value={name} 
              required 
              onChange={(e) => setName(e.target.value)} 
              style={{ padding: '12px', border: '1px solid var(--border)', outline: 'none', fontFamily: 'var(--ff-body)' }}
            />
          </div>

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
              placeholder="Create password" 
              value={password} 
              required 
              onChange={(e) => setPassword(e.target.value)} 
              style={{ padding: '12px', border: '1px solid var(--border)', outline: 'none', fontFamily: 'var(--ff-body)' }}
            />
          </div>

          <button type="submit" className="btn btn--primary" style={{ marginTop: '1rem', padding: '15px' }}>
            SIGN UP
          </button>

          <div style={{ textAlign: 'center', marginTop: '1rem', fontFamily: 'var(--ff-body)' }}>
            Already have an account? <Link to="/login" style={{ color: '#d4af7a', fontWeight: 'bold' }}>Sign In</Link>
          </div>

        </form>
      </div>
    </div>
  );
}