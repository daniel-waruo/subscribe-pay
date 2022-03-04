import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {CircularProgress, Fade, Grid} from "@mui/material";
import ProviderCard from "../src/ProviderCard";
import {getInstance} from '../axios';
import {Provider} from "../types";
import ProviderModal from "../src/ProviderModal";
import {useRouter} from "next/router";

function IndexPage() {
  const [providers, setProviders] = useState<Provider[]>()
  const [loading, setLoading] = useState(true)
  const [provider, setProvider] = useState<Provider>()
  const {query, push, isReady} = useRouter()
  const phone: string = query.phone as string

  useEffect(
    () => {
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
  if (!phone && isReady) {
    push('/login')
    return null
  }
  return (
    <Box sx={{background: 'primary.main'}}>
      <ProviderModal handleClose={() => setProvider(undefined)} provider={provider}/>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          backgroundColor: 'transparent',
          height: '100vh',
          opacity: '0.3',
          display: {
            xs: "none",
            lg: "inherit"
          }
        }}
        component="img"
        alt="Organization illustration."
        src="/home2.svg"
      />
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          backgroundColor: 'transparent',
          height: '100vh',
          opacity: '0.3'
        }}
        component="img"
        alt="Organization illustration."
        src="/home.svg"
      />
      <Box sx={{width: "100vw", position: "absolute", top: 0}}>
        <Box sx={{zIndex: 2}}>
          <Typography
            sx={{paddingY: "5rem", fontWeight: 'bolder',color:"rgba(0,70,150,0.9)"}}
            variant={'h2'}
            component={"h1"}
            textAlign={'center'}>
            Internet Providers
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
          <Fade in={!loading}>
            <Grid container sx={{padding: "2rem"}} spacing={4}>
              {providers?.map(
                (provider, index) => {
                  return (
                    <Grid onClick={() => setProvider(provider)} item xs={12} sm={10} md={6} lg={4} xl={3} key={index}>
                      <ProviderCard provider={provider}/>
                    </Grid>
                  )
                }
              )}
            </Grid>
          </Fade>
        </Box>
      </Box>
    </Box>
  );
}

export default IndexPage;
