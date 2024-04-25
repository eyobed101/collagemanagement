import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userLogin } from "../../redux/user";


export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [isLoggingIn, setLoggingIn] = useState(false);
  const [finished, setFinished] = useState(false);
  const [otp, setOTP] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const current = useSelector((state) => state.user.value);
  const [buttons, setButtons] = useState(false);
  const [value, setValue] = useState(0);



  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const onFinish = (e) => {
    e.preventDefault(); 
    console.log("data");
    // setLoading(true);
    let data = {
      email: email,
      password: password,
    };
    console.log("data is", data);
    if (data.email === 'onetest@gmail.com') {
      // Handle specific case
    }
    dispatch(userLogin(data))
      .then((res) => {
        console.log("test", res);
        setFinished(true)

        // if (data.email === 'onetest@gmail.com') {
        //   // Handle specific case
        // }
        // if (res.error) {
        //   // Handle error
        //   console.error("Failed to login");
        // }
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    if (current) {
      navigate("/");
    }
  }, [finished]);

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2 p-5 rounded-md ring-1 ring-[#8a9eae] shadow-md" onSubmit={onFinish}>
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
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button
          style={{backgroundColor: "#4279A6"}}
          className="mt-6" fullWidth type="submit">
            Sign In
          </Button>
          <Button onClick={handleForgotPassword} className="mt-2" fullWidth variant="outlined" color="primary">
          Forgot Password
        </Button>
        </form>

      </div>
      <div className="max-w-[30%] max-h-[30%] hidden lg:block my-auto pt-20">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
