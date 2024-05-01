import axiosInstance from "@/configs/axios";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
//   import { useDispatch } from "react-redux";
//   import { useNavigate } from "react-router-dom";
//   import { updatePassword } from "../../redux/user";  // Assumed action

export function PasswordChanger() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    setLoading(true);
    const data = {
      "email": email,
      "currentPassword": currentPassword,
      "newPassword": newPassword,
      "confirmPassword": confirmPassword

    };

    console.log(data);

    axiosInstance
      .post("/api/Authenticate/PasswordReset", data)
      .then((res) => {
        alert("Password successfully updated.");
        setLoading(false);
        navigate("/");
      })
      .catch((e) => {
        console.error("Failed to update password", e);
        setLoading(false);
        if (e.response && e.response.data) {
          alert(e.response.data.message);
        } else {
          alert("An error occurred while trying to update the password.");
        }
      });
  };

  return (
    <section className="m-8 px-4 py-3 flex bg-blue-gray-50 justify-center shadow-md rounded-md">
      <div className="w-full max-w-lg mt-2 mb-4">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Change Password
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your current and new password to update.
          </Typography>
        </div>
        <form
          className="mt-8 mb-2 mx-auto w-full p-5 rounded-md ring-1 ring-[#8a9eae] shadow-md"
          onSubmit={handleChangePassword}
        >
          <div className="mb-6 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Email
            </Typography>
            <Input
              type="email"
              size="lg"
              placeholder="Email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Current Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="Current Password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              New Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="New Password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Confirm New Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="Confirm New Password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button
            style={{ backgroundColor: "#4279A6" }}
            className="mt-6"
            fullWidth
            type="submit"
            disabled={loading}
          >
            Change Password
          </Button>
        </form>
      </div>
    </section>
  );
}

export default PasswordChanger;
