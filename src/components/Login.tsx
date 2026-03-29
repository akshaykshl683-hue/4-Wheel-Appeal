import React, { useState } from 'react';
import { signInWithGoogle } from '../firebase';

export const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in was cancelled. Please try again.');
      } else {
        setError('An error occurred during sign-in. Please try again.');
        console.error(err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleSignIn}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
