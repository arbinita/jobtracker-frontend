import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { login } from '../api/authApi';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error);
        } else {
          localStorage.setItem('token', res.data.token);
          navigate('/');
        }
      })
      .catch(() => setError('Something went wrong'));
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Welcome back</h2>
        {error && <p className="auth-error">{error}</p>}

        <label className="auth-label">Email</label>
        <input placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label className="auth-label">Password</label>
        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button type="submit" className="auth-submit">Log In</button>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </form>
    </div>
  );
}

export default Login;