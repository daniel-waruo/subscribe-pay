import React, {useState} from "react"
import {Box} from "@mui/system";
// @ts-ignore
import OtpInput from 'react-otp-input';
import {LockOutlined} from "@mui/icons-material";
import {Avatar, Grid, Typography} from "@mui/material";

type OTPFormProps = {
  setPhone: () => void
}
const OTPForm = ({setPhone}: OTPFormProps) => {
  const [otp, setOTP] = useState<string>()
  const onChangeHandler = (e: React.SetStateAction<string | undefined>) => {
    setOTP(e)
    if (e?.length === 4){
      setPhone()
    }
  }
  return (
    <Box sx={{textAlign: "center"}}>
      <Grid container justifyContent="center" sx={{marginBottom: "3rem"}}>
        <Grid item container alignItems="center" direction="column">
          <Grid item>
            <Avatar sx={{backgroundColor: "primary.main", marginY: "3rem"}}>
              <LockOutlined/>
            </Avatar>
          </Grid>
          <Grid item>
            <Typography component="h1" variant="h5">
              Verification Code
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h6">
            Please enter the verification code sent to your mobile
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
        <Grid item spacing={3} justifyContent="center">
          <OtpInput
            value={otp}
            onChange={onChangeHandler}
            numInputs={4}
            inputStyle={{
              width: "3rem",
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
