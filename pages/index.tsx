import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {CircularProgress, Fade, Grid} from "@mui/material";
import ProviderCard from "../src/ProviderCard";
import {getInstance} from '../axios';
import {Provider} from "../types";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import {Add} from "@mui/icons-material";
import PhoneForm from "../src/PhoneForm";
import ProviderModal from "../src/ProviderModal";

function IndexPage() {
  const [providers, setProviders] = useState<Provider[]>()
  const [loading, setLoading] = useState(true)
  const [phone, setPhone] = useState<string>()
  const [provider, setProvider] = useState<Provider>()

  useEffect(
    () => {
      if (!phone) return
      const searchParams = new URLSearchParams({phone})
      getInstance().get(`/subscriptions/providers?${searchParams.toString()}`, {
        data: {phone}
      }).then(
        (response) => {
          console.log(response.data)
          setProviders(response.data)
        }
      ).catch(
        (error) => {
          console.log(error)
        }
      ).finally(
        () => setLoading(false)
      )
    }, [phone]
  )

  if (!phone) return <PhoneForm setPhone={setPhone}/>
  return (
    <Box sx={{background:'primary.main'}} >
      <ProviderModal handleClose={() => setProvider(undefined)} provider={provider}/>
      <Box
        sx={{
          position:'absolute',
          left:0,
          backgroundColor:'transparent',
          height: '100vh',
          opacity:'0.5',
          display:{
            xs:"none",
            lg:"inherit"
          }
        }}
        component="img"
        alt="Organization illustration."
        src="/organization2.svg"
      />
      <Box
        sx={{
          position:'absolute',
          right:0,
          backgroundColor:'transparent',
          height: '100vh',
          opacity:'0.5'
        }}
        component="img"
        alt="Organization illustration."
        src="/organization.svg"
      />
      <Box sx={{width: "100vw", position: "absolute", top: 0}}>
        <Box sx={{zIndex: 2}}>
          <Typography
            sx={{paddingY: "5rem"}}
            variant={'h2'}
            textAlign={'center'}>
            Providers
          </Typography>
          {loading && (

            <CircularProgress sx={{
              position: 'absolute',
              top: "50%",
              left: "50%",
              width: "3rem",
              height: "4rem",
              marginTop: "-2rem",
              marginLeft: "-1.5rem"
            }} color="primary"/>
          )
          }
          <Fade in={!loading} >
            <Grid container sx={{padding:"2rem"}}  spacing={4} >
              {providers?.map(
                (provider, index) => {
                  return (
                    <Grid onClick={() => setProvider(provider)} item xs={12} sm={10} md={4} lg={3} key={index}>
                      <ProviderCard provider={provider}/>
                    </Grid>
                  )
                }
              )}
              <Grid item xs={12} sm={10} md={4} lg={3}>
                <Card
                  sx={{
                    padding: '1rem',
                    height: "100%",
                    borderRadius: "1rem",
                    textAlign: 'center',
                    transition: "transform 0.5s ease-in-out",
                    "&:hover": {
                      transform: "scale3d(1.075, 1.075, 1)",
                      boxShadow: "0px 3px 1px -2px white,0px 2px 2px 0px #bb85fb,0px 1px 5px 0px #c595fd"
                    },
                  }}>
                  <CardContent>
                    <Add sx={{
                      color: 'primary.light',
                      fontSize: '6rem'
                    }}/>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Fade>
        </Box>
      </Box>
    </Box>
  );
}

export default IndexPage;
