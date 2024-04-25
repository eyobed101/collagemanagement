// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Typography, Input, Button } from '@mui/material';
// import axios from 'axios';

// // import { auth } from './firebase'; // Import Firebase authentication

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [resetEmailSent, setResetEmailSent] = useState(false);
//   const [error, setError] = useState(null);

//   const handleForgotPassword = async () => {
//     try {
//       const response = await axios.post(
//         `${api}/api/Authenticate/ForgotPassword`,
//         { email },
//         {
//           headers: {
//             Authorization: 'Bearer YOUR_API_KEY_HERE',
//           },
//         }
//       );
//       console.log(response.data); // Handle response accordingly (e.g., show success message)
//     } catch (error) {
//       console.error('Forgot password error:', error);
//       // Handle error (e.g., show error message to user)
//     }
//   };
//   return (
//     <div>
//       <Typography variant="h2">Forgot Password</Typography>
//         <div>
//           <Typography variant="paragraph">
//             Enter your email address to receive a password reset link.
//           </Typography>
//           <Input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           {error && <Typography variant="paragraph" color="error">{error}</Typography>}
//           <Button onClick={handleForgotPassword}>Reset Password</Button>
//         </div>
//         <Typography variant="paragraph">
//         Remember your password? <Link to="/signin">Sign In</Link>
//       </Typography>
//     </div>
//   );
// };

// export default ForgotPassword;
import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [confirmationKey, setConfirmationKey] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log("Sending confirmation key to:", email);
    setStep(2);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      console.log("Resetting password for:", email);
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <section className="m-8 flex flex-col items-center justify-center ">
      <div className="text-center">
        <Typography variant="h2" className="font-bold mb-4">
          Reset Password
        </Typography>
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="text-lg font-normal"
        >
          {step === 1
            ? "Enter your email to receive a reset code."
            : "Enter the code and your new password."}
        </Typography>
      </div>
      {step === 1 ? (
        <form className="mt-8 mb-2 w-80" onSubmit={handleEmailSubmit}>
          <Input
            size="lg"
            placeholder="name@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
          />
          <Button fullWidth className="mt-4 bg-[#4279A6]">Send Confirmation Key</Button>
        </form>
      ) : (
        <form className="mt-8 mb-2 w-80" onSubmit={handleResetPassword}>
          <Input
            size="lg"
            placeholder="Enter confirmation key"
            value={confirmationKey}
            onChange={(e) => setConfirmationKey(e.target.value)}
            className="mb-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
          />
          <Input
            size="lg"
            placeholder="New password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mb-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
          />
          <Input
            size="lg"
            placeholder="Confirm new password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
          />
          <Button fullWidth>Reset Password</Button>
        </form>
      )}
      <Typography
        variant="paragraph"
        className="text-center text-blue-gray-500 font-medium mt-4"
      >
        Remembered your password?
        <Link to="/auth/sign-in" className="text-gray-900 ml-1">
          Sign in
        </Link>
      </Typography>
    </section>
  );
}

export default ForgotPassword;
