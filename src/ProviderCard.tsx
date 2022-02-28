import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Provider} from "../types";
import {Grid} from "@mui/material";

type ProviderCardProps = {
  provider: Provider
}

function ProviderCard({provider}: ProviderCardProps) {
  return (
    <Card
      sx={{
        padding: '0rem',
        borderRadius: "1rem",
        textAlign: 'center',
        transition: "transform 0.5s ease-in-out",
        "&:hover": {
          transform: "scale3d(1.075, 1.075, 1)",
          boxShadow: "0px 3px 1px -2px white,0px 2px 2px 0px #bb85fb,0px 1px 5px 0px #c595fd"
        },
      }}>
      <CardContent>
        <Grid container justifyContent={"center"}>
          <Grid item xs={12}>
            <img style={{height: "6rem"}} src={provider.logo} alt={'organization log'}/>
          </Grid>
        </Grid>
        <Typography  variant="h6" component="div">
          {provider.name}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProviderCard;
