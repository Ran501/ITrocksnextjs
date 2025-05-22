'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faLock,
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import styles from './account.module.css';

export default function AccountPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Check for admin credentials
      if (formData.email === "rangdelchoney618@gmail.com" && formData.password === "choney2021") {
        router.push('/admin');
        return;
      }

      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setActiveTab('login');
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));

    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (session) {
    return (
      <div className={styles.container}>
        <div className={styles.authContainer}>
          <div className={styles.form}>
            <h1>Welcome, {session.user?.name}</h1>
            <p className={styles.subtitle}>You are signed in as {session.user?.email}</p>
            <button 
              onClick={() => signIn('credentials', { callbackUrl: '/' })}
              className={styles.submitButton}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div style={{ 
        height: '40vh', 
        backgroundColor: 'white', 
        width: '100%', 
        position: 'relative',
        top: 0,
        left: 0,
        right: 0
      }}></div>
      <div className={styles.authContainer}>
        <div className={styles.tabButtons}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'login' ? styles.active : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'register' ? styles.active : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        {activeTab === 'login' ? (
          <form onSubmit={handleLogin} className={styles.form}>
            <h1>Welcome Back</h1>
            <p className={styles.subtitle}>Please login to your account</p>
            
            <div className={styles.formGroup}>
              <div className={styles.inputWithIcon}>
                <FontAwesomeIcon icon={faEnvelope} className={styles.inputIcon} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWithIcon}>
                <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className={styles.forgotPassword}>
              <a href="#">Forgot Password?</a>
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className={styles.form}>
            <h1>Create Account</h1>
            <p className={styles.subtitle}>Join us to get exclusive access</p>

            <div className={styles.formGroup}>
              <div className={styles.inputWithIcon}>
                <FontAwesomeIcon icon={faUser} className={styles.inputIcon} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWithIcon}>
                <FontAwesomeIcon icon={faEnvelope} className={styles.inputIcon} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWithIcon}>
                <FontAwesomeIcon icon={faPhone} className={styles.inputIcon} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWithIcon}>
                <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWithIcon}>
                <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 