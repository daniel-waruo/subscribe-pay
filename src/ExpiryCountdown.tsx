// @ts-ignore
import Countdown from "react-countdown";
import React from "react";
import {Grid} from "@mui/material";
import {Box} from "@mui/system";

const CountDownBox = ({value, label}: { value: string, label: string }) => {
  return (
    <Grid item xs={3}>
      <Box sx={{
        borderRadius: "1rem",
        background: "rgba(140,89,224,0.27)",
        //width: "6rem",
        marginX: "0.5rem",
        padding: "1rem"
      }}>
        <Box sx={{borderRadius: "0.75rem", background: "white"}}>
          <h2 style={{color:"rgba(61,61,61,0.78)"}}>{value}</h2>
        </Box>
        <p style={{textTransform: "uppercase"}}>{label}</p>
      </Box>
    </Grid>
  )
}

const ExpiryCountDown = ({date}: { date: string }) => {
  if (!date) return <h3>N/A</h3>
  // @ts-ignore
  const renderer = ({days, hours, minutes, seconds, completed}) => {
    if (completed) {
      return <h3>Subscription Expired</h3>;
    }
    return (
      <Grid container sx={{textAlign:"center"}}>
        <CountDownBox value={days} label={"days"}/>
        <CountDownBox value={hours} label={"hours"}/>
        <CountDownBox value={minutes} label={"minutes"}/>
        <CountDownBox value={seconds} label={"seconds"}/>
      </Grid>
    )
  };
  return <Countdown date={date} renderer={renderer}/>

}


export default ExpiryCountDown
