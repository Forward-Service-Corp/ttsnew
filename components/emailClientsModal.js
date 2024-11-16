// components/EmailModal.js
import { useState } from 'react';

const EmailClientsModal = ({ isOpen, onClose, emailData, sendEmail }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h2 className="text-xl font-bold mb-4">Send Email</h2>

                {/* Display fetched data */}
                <div className="mb-4">
                    <p>Subject: {emailData.subject}</p>
                    <p>Description: {emailData.description}</p>
                </div>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Recipient's email"
                    className="w-full mb-4 p-2 border rounded"
                />
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message"
                    className="w-full mb-4 p-2 border rounded"
                />

                <div className="flex justify-end">
                    <button
                        className="mr-2 bg-red-500 text-white p-2 rounded"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        className="bg-blue-500 text-white p-2 rounded"
                        onClick={() => sendEmail(email, message)}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailClientsModal;
