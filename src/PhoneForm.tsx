import React, {FormEvent, useState} from "react"
import {Box, Button, Grid, lighten, TextField, Typography} from "@mui/material";
import {Login} from "@mui/icons-material";
import OTPForm from "./OTPForm";

type PhoneFormProps = {
  setPhone: (phone: string) => void
}
export const PhoneForm = ({setPhone}: PhoneFormProps) => {
  const [phone, setPhoneInput] = useState<string>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <Grid container justifyContent={"center"}>
      <Grid item sm={12} md={8} lg={6}>
        <Box sx={{
          height: "100vh",
        }}>
          <Box sx={{
            paddingBottom: '2rem',
            paddingX: "2rem",
            paddingTop: {xs: "5rem"},
            borderRadius: "1rem",
            backgroundColor: lighten("#7c30d8", 0.95),
            height: {
              sm: "100%",
              md: "20rem"
            },
            width: {
              sm: "100%",
              md: "40rem"
            },
          }}>
            {isSubmitted ? <OTPForm setPhone={() => setPhone(phone as string)}/> :
              <Box
                component={"form"}
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  setIsSubmitted(true)
                  //setPhone(phone as string)
                }}
                sx={{textAlign: "center", paddingTop: {md: "8rem"}}}
              >
                <Box
                  sx={{
                    height: "20rem",
                    display: {md: "none"}
                  }}
                  component="img"
                  alt="Login"
                  src="/otp.svg"
                />
                <Typography variant={"h3"} sx={{marginBottom: "4rem",}}
                            fontWeight={"lighter"}>Login</Typography>
                <TextField
                  type={"text"}
                  fullWidth
                  inputProps={{
                    style:{
                      height:"2rem",
                      fontSize:"2rem"
                    }
                  }}
                  onChange={e => setPhoneInput(e.target.value)}
                  sx={{height:"4rem"}}
                  id="phone-field"
                  label="Phone Number"
                  variant="standard"/>
                <Button
                  type={"submit"}
                  startIcon={<Login/>}
                  color={"primary"}
                  sx={{
                    textAlign: "center",
                    marginBottom: "3rem",
                    marginTop: "2rem"
                  }}
                  variant={"contained"}>
                  Submit
                </Button>
              </Box>
            }
          </Box>
        </Box>
      </Grid>
      <Grid sx={{
        display: {
          sm: "none",
          md: "block"
        }
      }} item sm={12} md={4} lg={6}>
        <Box
          sx={{
            height: {
              md: "100%",
              lg: "90vh"
            }
          }}
          component="img"
          alt="The house from the offer."
          src="/otp.svg"
        />
      </Grid>
    </Grid>
  )
}

export default PhoneForm
