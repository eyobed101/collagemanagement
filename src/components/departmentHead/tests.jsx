import React, { useState } from 'react';

function App() {
    const [clientUuid, setClientUuid] = useState('');
    const [key, setKey] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        try {
            const response = await fetch('http://127.0.0.1:8000/api/verify-key-and-otp/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ client_uuid: clientUuid, key, otp }),
            });
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="clientUuidInput">Client UUID:</label>
                <input
                    type="text"
                    id="clientUuidInput"
                    value={clientUuid}
                    onChange={(e) => setClientUuid(e.target.value)}
                />
                <label htmlFor="keyInput">Key:</label>
                <input
                    type="text"
                    id="keyInput"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                />
                <label htmlFor="otpInput">OTP:</label>
                <input
                    type="text"
                    id="otpInput"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default App;
