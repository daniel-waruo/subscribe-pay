import React, {useState} from "react";
import OTPSection from "../src/OTPSection";
import PhoneSection from "../src/PhoneSection";
import {useRouter} from "next/router";

const LoginPage = () => {
  const [phone, setPhone] = useState<string>()
  if (phone) {
    return (
      <OTPSection phone={phone}/>
    )
  }
  return <PhoneSection setPhone={setPhone}/>

}


export default LoginPage
