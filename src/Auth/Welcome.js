import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
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


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [finished, setFinished] = useState(false);
  const [otp, setOTP] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const current = useSelector((state) => state.user.value);
  const [buttons, setButtons] = useState(false);
  const [value, setValue] = React.useState(0);

  const generateRecaptcha = () => {
    setButtons(true);
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          console.log("prepared phone auth process", response);
        },
      },
      firebaseAuth
    );
  };

  const verifyOTP = (e) => {
    let otp = e;
    setOTP(otp);
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp).then((result) => {
        const user = result.user;
        var dat = {
          user: user,
          type: "teacher",
        };
        dispatch(phoneLogin(dat));
      });
    }
  };

  const signInPhone = () => {
    generateRecaptcha();

    const appVerifier = window.recaptchaVerifier;
    if (phone) {
      setFinished(true);
    }

    signInWithPhoneNumber(firebaseAuth, phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        setButtons(false);
      })
      .catch((error) => {
        console.log(error);
        setButtons(false);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPhone();
  };

  const onFinish = () => {
    setLoading(true);
    var data = {
      email: email,
      password: password,
    };
    dispatch(userLogin(data))
      .then((res) => {
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    if (current) {
      navigate("/");
    }
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",   
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex",height: '1024px',width: '1440px' ,left: '2266px',top: '576px',
     borderRadius: '0px'}}>
        <div  style={{ flexDirection:'column'}}>
        <img src={require('../logo 1.png')}  style={{position:'absolute' , width:'166px', height:'68px',left:'637px',top:'137px'}}  />
        <div  style={{display:"flex" , flexDirection:'column', alignItems:'center',padding:'24px',gap:'40px',
      position:'absolute', width:'400px', height:'296px',left:'520px', top:'298px', background:'#FFFFFFF', borderRadius:'8px' }}>
        <Button 
         onClick={() => navigate('/login')}
        >
        <img src={require('../Dialog.png')}  />
        </Button >
        </div>
        <img src={require('../Class Debat 1.png')} style={{position:'absolute', width:'530px',height:'397px',left:'968px',top:'677px', borderRadius:'25px'}}/>
        </div>
        
      </div>
    </div>
  );
}
