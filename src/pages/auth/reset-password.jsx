import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = ({ resetToken }) => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleResetPassword = async () => {
    
    const postData ={
        "email" : email ,
        "currentPassword" : currentPassword ,
        "newPassword" : newPassword,
        "confirmPassword" : confirmPassword
    }

    try {
      const response = await axios.post(
        `${api}/api/Authenticate/PasswordReset`,
        { postData , resetToken },
        {
          headers: {
            Authorization: 'Bearer YOUR_API_KEY_HERE',
          },
        }
      );
      console.log(response.data); // Handle response accordingly (e.g., show success message)
    } catch (error) {
      console.error('Reset password error:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <section className="m-8 flex gap-4">
    <div className="w-full lg:w-3/5 mt-24">
      <div className="text-center">
        <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
        <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
      </div>
      <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
            Your email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
           Current Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
               <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
           Current Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
               <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
           Confirm Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
    
        <Button
        style={{backgroundColor: "#4279A6"}}
        onClick={handleResetPassword} className="mt-6" fullWidth type="submit">
          Reset Password 
        </Button>
      </form>
    </div>


  </section>
  );
};

export default ResetPassword;
