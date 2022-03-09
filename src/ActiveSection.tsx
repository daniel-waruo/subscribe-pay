import React from "react"
import {Box, Grid} from "@mui/material";
import Card from "@mui/material/Card";
import {Subscriber} from "../types";
import Typography from "@mui/material/Typography";
import ExpiryCountDown from "./ExpiryCountdown";

type SubscriptionCardProps = {
  subscriber: Subscriber
}


function SubscriptionCard({subscriber}: SubscriptionCardProps) {
  return (
    <Card
      sx={{
        padding: '2rem',
        width: "100%",
        //boxShadow: "none",
        borderRadius: "1rem",
        backgroundColor: "rgba(255,255,255,0.82)",
        transition: "transform 0.5s ease-in-out",
        "&:hover": {
          transform: "scale3d(1.075, 1.075, 1)",
          //boxShadow: "0px 3px 1px -2px #90ECAA42,0px 2px 2px 0px #90ECAA42,0px 1px 5px 0px #90ECAA42"
        },
      }}>
      <Grid container justifyContent={"center"}>
        <Grid item xs={12} sx={{maxWidth: "6rem"}}>
          <h1>{subscriber.subscription.name}</h1>
          <p style={{paddingBottom: "2rem"}}>{subscriber.subscription.description}</p>
          <ExpiryCountDown date={subscriber.expiry_date}/>
        </Grid>
      </Grid>
    </Card>
  )
}

type ActiveSectionProps = {
  subscribers?: Subscriber[]
}
export const ActiveSection = ({subscribers}: ActiveSectionProps) => {
  if (!subscribers?.length){
    return null;
  }
  return (
    <Box sx={{position: 'relative'}}>
      <Box sx={{zIndex: 1000}}>
        <Typography
          sx={{paddingY: "2rem", fontWeight: 'bolder', color: "rgba(0,70,150,0.82)"}}
          variant={'h2'}
          textAlign={"center"}
          component={"h1"}>
          Active Subscriptions
        </Typography>
        <Grid container>
          {subscribers?.map(
            (subscriber, key) => (
              <Grid item sm={12} md={6} key={key}>
                <SubscriptionCard subscriber={subscriber}/>
              </Grid>
            )
          )}
        </Grid>
      </Box>
    </Box>
  )
}

export default ActiveSection
