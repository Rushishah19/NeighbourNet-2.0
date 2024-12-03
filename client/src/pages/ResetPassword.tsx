import React, { useState } from 'react';
import { AxiosError } from 'axios';
import api from '../api/api';

export function ResetPassword({ token }: { token: string }) {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await api.post('/users/reset-password/confirm', {
                token,
                newPassword,
            });
            setMessage(response.data.message || 'Password reset successful.');
        } catch (error) {
            if (api.isAxiosError(error)) {
                setMessage((error as AxiosError<{ message: string }>).response?.data?.message || 'Error resetting password.');
            } else {
                setMessage('Error resetting password.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
                <div>
                    <label className="block text-sm font-medium">New Password</label>
                    <input
                        type="password"
                        required
                        className="mt-1 block w-full border rounded p-2"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded"
                >
                    Reset Password
                </button>
                {message && <p className="mt-4 text-center">{message}</p>}
            </form>
        </div>
    );
}