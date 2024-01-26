import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, message, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/user";
import { Link, useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "react-phone-number-input/style.css";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { firebaseAuth } from "../firebase";
import PhoneInput from "react-phone-number-input";
import OtpInput from "react-otp-input";
import { phoneLogin } from "../redux/user";

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [setLogingIn, setLoadingData] = useState(false);
  const [finished, setFinished] = useState(false);
  const [otp, setOTP] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const current = useSelector((state) => state.user.value);
  const [buttons, setButtons] = useState(false);
  const [value, setValue] = React.useState(0);



  const onFinish = () => {
    console.log("data");
    setLoading(true);
    var data = {
      email: email,
      password: password,
    };
    console.log("data is"  ,data);
    if(data.email === 'onetest@gmail.com'){
      
    }
    dispatch(userLogin(data))
      .then((res) => {
        console.log("test " ,res)
        if(data.email === 'onetest@gmail.com'){
        
        }
        if (res.error) {
          message.error("Failed to login");
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (current) {
      navigate("/");
    }
  });

  return (
    <div className="flex min-h-screen" >
      <div className="w-full md:w-1/2 flex items-center">
        <div className="w-full max-w-70 mx-auto px-4 py-15">
          <div className="flex items-center justify-center">
            <img src={require('../assets/logo1.png')} className="w-10" />
          </div>
          <div className="text-center my-5">
            <h1
              className="text-center text-2xl font-medium mb-10 ml-[-10] !font-jakarta">Sign in With MackMill</h1>
          </div>
          <div className="lg:flex lg:items-center mb-2">
          </div>
          <div className="relative flex items-center justify-center h-5 mb-2">
          </div>
          <div className="ml-[25%]">
            <div className="flex flex-col justify-center mb-[20px] ">
              <input
                required
                placeholder="Email Address"
                className="border-[#D0D5DD] focus:bg-[#FCF2FB] !font-jakarta  outline-none border-[2px] text-[gray] font-light h-[44px] w-[300px] hover:border-[#0693e3] focus:border-[#0693e3] rounded-lg p-2"
                onChange={(e) => setEmail(e.target.value)}
                onChang
              />
            </div>
            <div className="flex flex-col mb-[20px]">
              <input
                required
                type="password"
                placeholder="password"
                className="border-[#D0D5DD] focus:bg-[#FCF2FB] !font-jakarta outline-none border-[2px] text-[gray] font-light h-[44px] w-[300px] hover:border-[#0693e3] focus:border-[#0693e3] rounded-lg p-2"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              onClick={() => onFinish()}
              className="!font-jakarta w-[300px] !h-[44px] !rounded-lg  hover:!bg-gradient-to-l hover:from-[#0693e3] hover:to-[#0693e3] 
              !bg-gradient-to-r from-[#0693e3] to-[#FAAA35] 
              !text-[white] hover:!text-[white] hover:!border-[#0693e3]  border-[#0693e3]"
              // disabled={loading}

              // loading={loading}
              type="submit"
            >
              Login
            </Button>
          </div>
          <div className="flex items-center justify-center mt-5">

          </div>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2 bg-wtf-pigmentblue relative overflow-hidden justify-center">
        <svg className="absolute top-0 left-0" width={720} height={784} viewBox={"0 0 720 784"}
          fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
          <path
            d="M-392.905 -502.476L-391.004 -501.739C-391.004 -501.739 326.491 -197.031 501.442 -56.8491C676.392 83.3324 662.208 352.981 508.59 506.599C354.972 660.217 85.3233 674.401 -54.8582 499.451C-195.04 324.5 -499.748 -392.994 -499.748 -392.994L-500.485 -394.895C-516.584 -436.403 -527.156 -463.658 -494.411 -496.402C-461.667 -529.146 -434.412 -518.575 -392.905 -502.476Z"
            fill="#0693e3"
          >
          </path>
        </svg>
        <svg className="absolute top-0 left-0" width={392} height={487} viewBox={"0 0 392 487"}
          fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
          <path
            d="M-336.818 -308.216L-335.645 -307.762C-335.645 -307.762 106.836 -120.048 214.706 -33.6373C322.576 52.7737 313.735 219.111 218.923 313.922C124.112 408.734 -42.2253 417.575 -128.636 309.705C-215.047 201.835 -402.761 -240.646 -402.761 -240.646L-403.215 -241.819C-413.132 -267.417 -419.644 -284.226 -399.434 -304.435C-379.225 -324.644 -362.416 -318.133 -336.818 -308.216Z"
            fill="#FCC5F3"
          >
          </path>
        </svg>
        <svg className="absolute bottom-0 left-0" width={632} height={316} viewBox={"0 0 632 316"}
          fill={"#15C9CE"} xmlns={"http://www.w3.org/2000/svg"}>
          <path
            d="M-351.418 900.397L-350.856 898.948C-350.856 898.948 -118.665 351.944 -11.8154 218.578C95.0341 85.2126 300.633 96.0786 417.79 213.235C534.947 330.392 545.813 535.991 412.447 642.841C279.081 749.69 -267.923 981.882 -267.923 981.882L-269.372 982.444C-301.016 994.711 -321.795 1002.77 -346.768 977.793C-371.74 952.821 -363.685 932.042 -351.418 900.397Z"
            fill="#15C9CE"></path>
        </svg>
        <svg className="absolute bottom-0 right-0" width={477} height={768} viewBox={"0 0 477 768"}
          fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
          <path
            d="M334.917 239.653L336.582 240.299C336.582 240.299 965.06 507.074 1118.29 629.839C1271.52 752.603 1259.04 988.825 1124.43 1123.43C989.823 1258.04 753.6 1270.52 630.836 1117.29C508.071 964.063 241.296 335.585 241.296 335.585L240.65 333.92C226.556 297.562 217.301 273.688 245.993 244.996C274.685 216.304 298.559 225.559 334.917 239.653Z"
            fill="#00ACFF"
          >
          </path>
        </svg>
        <div className="flex items-center justify-center h-[100vh] ">
          <div className="w-79 bg-white justify-center rounded shadow-menu">
            <div style={{ position: "relative", backgroundColor: 'white', width: 380, height: 350, borderRadius: 15, padding: 20 }}>
              <div className="w-20 h-12">
                <img className="block w-40 h-12 ml-5 mt-5 mb-5" src={require('../assets/logo1.png')} />
              </div>
              <p className="text-16 mt-10 !font-jakarta  ">
               MackMill School System is developed by Mackmill Corporation and is licensed under the 
               School Management License and has a public license and has been working for the past 12 years and 
               This management system ensures the strategy of the Mackmill
                .</p>
              <div className="relative flex items-center mt-2">
                <img className="block w-8 h-8 rounded-full"
                  src={require('../assets/logo1.jpeg')}
                />
                <div className="ml-2 ">
                  <h4 className="text-16 font-medium !font-jakarta ">adminstrator</h4>
                  {/* <span className="text-wtf-wildblue !font-jakarta mt[-20]">@Mackmill</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      </div>
  );
}

// {/* <Box sx={{ width: "100%" }}>
//   <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//     <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//       <Tab label="Admin" {...a11yProps(0)} />
//       <Tab label="Teacher or Parent" {...a11yProps(1)} />
//       {/* <Tab label="Parent" {...a11yProps(2)} /> */}
//     </Tabs>
//   </Box>
//   <TabPanel value={value} index={0}>
//     <Form
//       name="basic"
//       labelCol={{
//         span: 8,
//       }}
//       wrapperCol={{
//         span: 16,
//       }}
//       initialValues={{
//         remember: true,
//       }}
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//       autoComplete="off"
//     >
//       <Form.Item
//         label="Email"
//         name="email"
//         rules={[
//           {
//             required: true,
//             message: "Please input your email!",
//           },
//         ]}
//       >
//         <Input onChange={(e) => setEmail(e.target.value)} />
//       </Form.Item>

//       <Form.Item
//         label="Password"
//         name="password"
//         rules={[
//           {
//             required: true,
//             message: "Please input your password!",
//           },
//         ]}
//       >
//         <Input.Password onChange={(e) => setPassword(e.target.value)} />
//       </Form.Item>

//       <Form.Item
//         name="remember"
//         valuePropName="checked"
//         wrapperCol={{
//           offset: 8,
//           span: 16,
//         }}
//       >
//         <Checkbox>Remember me</Checkbox>
//       </Form.Item>

//       <Form.Item
//         wrapperCol={{
//           offset: 8,
//           span: 16,
//         }}
//       >
//         <Button loading={loading} type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//   </TabPanel>
//   <TabPanel value={value} index={1}>
//     <PhoneInput
//       placeholder="Enter phone number"
//       value={phone}
//       onChange={setPhone}
//     />
//     {finished ? (
//       <div style={{ marginTop: 20 }}>
//         <OtpInput
//           value={otp}
//           onChange={(e) => verifyOTP(e)}
//           numInputs={6}
//           separator={<span>---</span>}
//         />
//       </div>
//     ) : null}
//     <Button
//       id="sign-in-button"
//       loading={buttons}
//       type="primary"
//       style={{ marginTop: 20 }}
//       onClick={() => signInPhone()}
//     >
//       Request OTP
//     </Button>
//   </TabPanel>
// </Box>; */}
