import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export default function AuthCallback() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Confirming your email...');
  const { signIn } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the hash from URL (Supabase adds tokens here)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const error = hashParams.get('error');
        const errorDescription = hashParams.get('error_description');

        // Check for error in URL
        if (error) {
          setStatus('error');
          setMessage(errorDescription || 'Email confirmation failed. The link may have expired.');
          return;
        }

        // If we have tokens, set the session
        if (accessToken && refreshToken) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (sessionError) {
            throw sessionError;
          }

          setStatus('success');
          setMessage('Email confirmed successfully! Redirecting...');

          // Redirect to home after 2 seconds
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        } else {
          // Try to get session from Supabase (in case tokens are already set)
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();

          if (sessionError) {
            throw sessionError;
          }

          if (session) {
            setStatus('success');
            setMessage('Email confirmed successfully! Redirecting...');
            setTimeout(() => {
              window.location.href = '/';
            }, 2000);
          } else {
            throw new Error('No authentication tokens found');
          }
        }
      } catch (err: any) {
        console.error('Auth callback error:', err);
        setStatus('error');
        setMessage(err.message || 'Failed to confirm email. Please try again or contact support.');
      }
    };

    handleAuthCallback();
  }, []);

  return (
    <div className="min-h-screen bg-bordeaux-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-bordeaux-50 rounded-lg shadow-lg p-8 text-center border border-bordeaux-200">
          {status === 'loading' && (
            <>
              <Loader2 className="w-16 h-16 mx-auto mb-4 text-bordeaux-950 animate-spin" />
              <h2 className="text-2xl font-serif mb-2">Confirming Your Email</h2>
              <p className="text-bordeaux-800">{message}</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h2 className="text-2xl font-serif mb-2 text-green-600">Email Confirmed!</h2>
              <p className="text-bordeaux-800 mb-4">{message}</p>
              <p className="text-sm text-bordeaux-700">You can now sign in to your account.</p>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="w-16 h-16 mx-auto mb-4 text-bordeaux-950" />
              <h2 className="text-2xl font-serif mb-2 text-bordeaux-950">Confirmation Failed</h2>
              <p className="text-bordeaux-800 mb-4">{message}</p>
              <div className="space-y-2">
                <a
                  href="/"
                  className="inline-block bg-bordeaux-950 text-white px-6 py-2 rounded-lg hover:bg-bordeaux-900 transition"
                >
                  Go to Home
                </a>
                <p className="text-sm text-bordeaux-700 mt-4">
                  Need help? Try{' '}
                  <a href="/" className="text-bordeaux-950 underline">
                    signing up again
                  </a>
                  .
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

