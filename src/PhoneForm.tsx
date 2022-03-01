import React, {ChangeEvent, FormEvent, useState} from "react";
import {Box, Button, lighten, TextField, Typography} from "@mui/material";
import {Login} from "@mui/icons-material";


type PhoneFormProps = {
  setPhone: (phone: string) => void
}
export const PhoneForm = ({setPhone}: PhoneFormProps) => {
  const [phone, setPhoneInput] = useState<string>("0");
  const phoneIsValid = phone.length == 10 && (phone.startsWith("01") || phone.startsWith("07"));

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneInput(e.target.value)
  }
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (phoneIsValid) setPhone(`254${phone.slice(1)}`)
  }
  return (
    <Box sx={{height: "100vh",}}>
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
        <Box
          component={"form"}
          onSubmit={onSubmitHandler}
          sx={{textAlign: "center", paddingTop: {md: "8rem"}}}
        >
          <Box
            sx={{height: "15rem", display: {md: "none"}}}
            component="img"
            alt="Login"
            src="/phone.svg"
          />
          <Typography variant={"h3"} sx={{marginBottom: "4rem",}}
                      fontWeight={"lighter"}>Login</Typography>
          <TextField
            id="phone-field"
            label="Phone Number"
            variant="standard"
            error={!phoneIsValid}
            type={"text"}
            fullWidth
            helperText={"Enter your phone-number e.g 0122334443 ,0722334443 "}
            inputProps={{
              style: {
                height: "2rem",
                fontSize: "2rem"
              }
            }}
            onChange={onChangeHandler}
            sx={{height: "4rem"}}
          />
          <Button
            type={"submit"}
            startIcon={<Login/>}
            color={"primary"}
            sx={{
              textAlign: "center",
              marginBottom: "3rem",
              marginTop: "2rem"
            }}
            disabled={!phoneIsValid}
            variant={"contained"}>
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default PhoneForm;
