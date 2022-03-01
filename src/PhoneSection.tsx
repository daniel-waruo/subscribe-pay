import React from "react"
import {Box, Grid} from "@mui/material";
import MobileSVG from "./MobileSVG";
import PhoneForm from "./PhoneForm";

type PhoneSectionProps = {
  setPhone: (phone: string) => void
}
export const PhoneSection = ({setPhone}: PhoneSectionProps) => {

  return (
    <Grid container justifyContent={"center"}>
      <Grid item sm={12} md={8} lg={6}>
        <PhoneForm setPhone={setPhone}/>
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
        >
          <MobileSVG/>
        </Box>
      </Grid>
    </Grid>
  )
}

export default PhoneSection
