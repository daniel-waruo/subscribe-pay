import React, {useState} from "react"
import OtpInput from 'react-otp-input';
import {Box, Grid, Typography} from "@mui/material";
import {useRouter} from "next/router";
import {getInstance} from "../axios";

type OTPFormProps = {
  phone: string
}
const OTPForm = ({phone}: OTPFormProps) => {
  const [otp, setOTP] = useState<string>()
  const router = useRouter()
  const onChangeHandler = (otp: React.SetStateAction<string | undefined>) => {
    setOTP(otp)
    if (otp?.length === 4) {
      getInstance().post('validate-otp', {phone, otp}).then(
        (response) => {
          console.log(response.data)
          if (response.data.is_valid) {
            router.push({
              pathname: '/',
              query: {phone: phone},
            })
          } else {
            setOTP(undefined)
            alert("Invalid OTP please confirm all digits are correct")
          }
        }
      )
    }
  }
  return (
    <Box sx={{textAlign: "center"}}>
      <Grid container justifyContent="center" sx={{marginBottom: "3rem"}}>
        <Grid item container alignItems="center" direction="column">
          <Grid item>
            <Box
              sx={{height: "15rem"}}
              component="img"
              alt="Login"
              src="/otp.svg"
            />
          </Grid>
          <Grid item>
            <Typography component="h1" variant="h5">
              Verification Code
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Typography sx={{color: 'text.light'}} variant="h6">
            Please enter the verification code sent to your mobile phone
          </Typography>
        </Grid>
      </Grid>
      <Grid
        xs={12}
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid item >
          <OtpInput
            value={otp}
            isInputNum
            onChange={onChangeHandler}
            numInputs={4}
            inputStyle={{
              width: "100%",
              maxWidth: '3rem',
              height: "3rem",
              margin: "0 1rem",
              fontSize: "2rem",
              borderRadius: 4,
              border: "1px solid rgba(124,48,216,0.98)"
            }}
            separator={
              <span>
                <strong>.</strong>
              </span>
            }
          />
        </Grid>
      </Grid>
    </Box>
  )
}


export default OTPForm
