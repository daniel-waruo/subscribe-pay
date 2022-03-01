import React, {useState} from "react"
import {Box, Grid, lighten} from "@mui/material";
import OTPForm from "./OTPForm";

type OTPSectionProps = {
  phone: string
}
export const OTPSection = ({phone}: OTPSectionProps) => {
  return (
    <Grid container justifyContent={"center"} >
      <Grid item xs={12} md={8} lg={6}>
        <Box sx={{
          paddingBottom: '2rem',
          margin:"2rem",
          paddingTop: {xs: "5rem"},
          borderRadius: "1rem",
          backgroundColor: lighten("#7c30d8", 0.95),
          height: {
            sm: "100%",
            md: "20rem"
          },
        }}>
          <OTPForm phone={phone}/> :
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

export default OTPSection
