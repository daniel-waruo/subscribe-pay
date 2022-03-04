import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {Provider} from "../types";
import {Avatar, Grid, lighten} from "@mui/material";

type ProviderCardProps = {
  provider: Provider
}

function ProviderCard({provider}: ProviderCardProps) {
  return (
    <Card
      sx={{
        paddingY: '2rem',
        width: "100%",
        //boxShadow: "none",
        borderRadius: "1rem",
        textAlign: 'center',
        backgroundColor: "rgba(255,255,255,0.9)",
        transition: "transform 0.5s ease-in-out",
        "&:hover": {
          transform: "scale3d(1.075, 1.075, 1)",
          //boxShadow: "0px 3px 1px -2px #90ECAA42,0px 2px 2px 0px #90ECAA42,0px 1px 5px 0px #90ECAA42"
        },
      }}>
      <Grid container justifyContent={"center"}>
        <Grid item sx={{maxWidth: "6rem"}}>
          <Avatar variant={'rounded'} sx={{height: "100%", width: "100%"}}
                  src={provider.logo}/>
        </Grid>
        <Grid item sx={{height: "4rem"}}>
          <Typography sx={{paddingTop: "1rem", paddingLeft: "1rem"}} variant="h5"
                      color={lighten("rgb(0,0,0)", 0.1)}>
            {provider.name}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

export default ProviderCard;
