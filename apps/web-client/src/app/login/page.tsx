'use client'

import { useState } from 'react';
import { useAuth } from '@/app/hooks/useAuth';
import { ApiRequests } from '@/app/api-requests/api-requests';
import LoginForm from '@/app/components/login-form/login-form';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const { user, loading } = useAuth(true);


    if (loading) return <div>Loading...</div>;
    if (user) return null; // redirect happens in hook


    const handleSubmit = async () => {
        setError('');

        try {
            await ApiRequests.login(email, password);
        } catch (err) {
            // @ts-expect-error any type
            setError(err?.response?.data?.message || 'Login failed');
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 p-6">
            <div className="max-w-md w-full bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl p-10 border border-white/20">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center shadow-xl">
                        <span className="text-4xl">⚽</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-white mt-4 tracking-wide text-center">
                        Welcome back!
                    </h2>
                    <p className="text-blue-200 mt-1 text-center text-sm">Sign in to continue your journey!</p>
                </div>


                <LoginForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    handleSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    error={error}
                />


                <p className="mt-6 text-center text-green-100 text-sm">
                    Don’t have an account?{' '}
                    <a href="/register" className="text-white font-semibold hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
