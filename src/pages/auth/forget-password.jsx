import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Input, Button } from '@mui/material';
import axios from 'axios';

// import { auth } from './firebase'; // Import Firebase authentication

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [error, setError] = useState(null);

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        `${api}/api/Authenticate/ForgotPassword`,
        { email },
        {
          headers: {
            Authorization: 'Bearer YOUR_API_KEY_HERE',
          },
        }
      );
      console.log(response.data); // Handle response accordingly (e.g., show success message)
    } catch (error) {
      console.error('Forgot password error:', error);
      // Handle error (e.g., show error message to user)
    }
  };
  return (
    <div>
      <Typography variant="h2">Forgot Password</Typography>
        <div>
          <Typography variant="paragraph">
            Enter your email address to receive a password reset link.
          </Typography>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <Typography variant="paragraph" color="error">{error}</Typography>}
          <Button onClick={handleForgotPassword}>Reset Password</Button>
        </div>
        <Typography variant="paragraph">
        Remember your password? <Link to="/signin">Sign In</Link>
      </Typography>
    </div>
  );
};

export default ForgotPassword;
