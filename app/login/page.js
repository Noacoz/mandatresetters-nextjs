'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState('email'); // email, verify
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timer, setTimer] = useState(0);

  // Request verification code
  const handleRequestCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/request-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to send code');
        return;
      }

      setSuccess('Verification code sent to your email!');
      setStep('verify');
      setTimer(600); // 10 minutes
    } catch (err) {
      console.error('Request code error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Verify code and login
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invalid code');
        return;
      }

      // Store token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to dashboard
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Verify error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Timer effect
  React.useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          setStep('email');
          setCode('');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0a1931', margin: '0 0 8px 0' }}>
            Mandatresetters
          </h1>
          <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Admin Dashboard Login</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fee', border: '1px solid #fcc', color: '#c33', padding: '12px', borderRadius: '4px', marginBottom: '20px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ backgroundColor: '#efe', border: '1px solid #cfc', color: '#3c3', padding: '12px', borderRadius: '4px', marginBottom: '20px', fontSize: '14px' }}>
            {success}
          </div>
        )}

        {step === 'email' ? (
          <form onSubmit={handleRequestCode}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                Admin Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mandatresetters.com"
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#0a1931',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? 'Sending Code...' : 'Request Verification Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                Verification Code
              </label>
              <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#666' }}>
                A 6-digit code has been sent to <strong>{email}</strong>
              </p>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                maxLength="6"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '20px',
                  textAlign: 'center',
                  letterSpacing: '8px',
                  border: '2px solid #ddd',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  fontWeight: 'bold',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px', textAlign: 'center', color: '#666', fontSize: '13px' }}>
              Code expires in: <strong style={{ color: timer < 120 ? '#c33' : '#333' }}>{formatTime(timer)}</strong>
            </div>

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#0a1931',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: loading || code.length !== 6 ? 'not-allowed' : 'pointer',
                opacity: loading || code.length !== 6 ? 0.6 : 1,
              }}
            >
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep('email');
                setCode('');
                setEmail('');
                setTimer(0);
              }}
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '10px',
                backgroundColor: 'transparent',
                color: '#0a1931',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Use Different Email
            </button>
          </form>
        )}

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link href="/" style={{ color: '#0a1931', textDecoration: 'none', fontSize: '14px' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
