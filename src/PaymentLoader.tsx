import React, {useEffect, useRef, useState} from "react"
import {Box, Button, Grid, LinearProgress, Typography} from "@mui/material";
import {Subscription, Transaction} from "../types";
import PaymentSVG from "./PaymentSVG";
import {getInstance} from "../axios";
import SentimentVeryDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentVeryDissatisfiedTwoTone';
import RefreshIcon from '@mui/icons-material/Refresh';
import SuccessSVG from "./SuccessSVG";

export const useInterval = (callback: () => void, delay: number) => {

  const savedCallback = useRef();

  useEffect(() => {
    // @ts-ignore
    savedCallback?.current = callback;
  }, [callback]);


  useEffect(() => {
    function tick() {
      // @ts-ignore
      savedCallback?.current();
    }

    if (delay !== 0) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

type PaymentLoaderProps = {
  subscription?: Subscription,
  transaction: Transaction,
  setTransaction: (transaction?: Transaction) => void
}


const PaymentSuccess = ({transaction, setTransaction}: PaymentLoaderProps) => {
  return (
    <Box sx={{height:'70vh',position:'relative'}}>
      <style>
        {`
        .confetti {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
      }
      .confetti-piece {
          position: absolute;
          width: 10px;
          height: 30px;
          background: #ffd300;
          top: 0;
          opacity: 0;
      }
      .confetti-piece:nth-child(1) {
          left: 7%;
          -webkit-transform: rotate(-40deg);
          -webkit-animation: makeItRain 1000ms infinite ease-out;
          -webkit-animation-delay: 182ms;
          -webkit-animation-duration: 1116ms;
      }
      .confetti-piece:nth-child(2) {
          left: 14%;
          -webkit-transform: rotate(4deg);
          -webkit-animation: makeItRain 1000ms infinite ease-out;
          -webkit-animation-delay: 161ms;
          -webkit-animation-duration: 1076ms;
      }
      .confetti-piece:nth-child(3) {
          left: 21%;
          -webkit-transform: rotate(-51deg);
          -webkit-animation: makeItRain 1000ms infinite ease-out;
          -webkit-animation-delay: 481ms;
          -webkit-animation-duration: 1103ms;
      }
      .confetti-piece:nth-child(4) {
          left: 28%;
          -webkit-transform: rotate(61deg);
          -webkit-animation: makeItRain 1000ms infinite ease-out;
          -webkit-animation-delay: 334ms;
          -webkit-animation-duration: 708ms;
      }
      .confetti-piece:nth-child(5) {
          left: 35%;
          -webkit-transform: rotate(-52deg);
          -webkit-animation: makeItRain 1000ms infinite ease-out;
          -webkit-animation-delay: 302ms;
          -webkit-animation-duration: 776ms;
      }
      .confetti-piece:nth-child(6) {
          left: 42%;
          -webkit-transform: rotate(38deg);
          -webkit-animation: makeItRain 1000ms infinite ease-out;
          -webkit-animation-delay: 180ms;
          -webkit-animation-duration: 1168ms;
      }
      .confetti-piece:nth-child(7) {
          left: 49%;
          -webkit-transform: rotate(11deg);
          -webkit-animation: makeItRain 1000ms infinite ease-out;
          -webkit-animation-delay: 395ms;
          -webkit-animation-duration: 1200ms;
      }
      .confetti-piece:nth-child(8) {
          left: 56%;
          -webkit-transform: rotate(49deg);
          -webkit-animation: makeItRain 1000ms infinite ease-out;
          -webkit-animation-delay: 14ms;
          -webkit-animation-duration: 887ms;
      }
      .confetti-piece:nth-child(9) {
          left: 63%;
          -webkit-transform: rotate(-72deg);
          -webkit-animation: makeItRain 1000ms infinite ease-out;
          -webkit-animation-delay: 149ms;
          -webkit-animation-duration: 805ms;
      }
      .confetti-piece:nth-child(10) {
          left: 70%;
          -webkit-transform: rotate(10deg);
          -webkit-animation: makeItRain 1000ms infinite ease-out;
          -webkit-animation-delay: 351ms;
          -webkit-animation-duration: 1059ms;
      }
      .confetti-piece:nth-child(11) {
          left: 77%;
          -webkit-transform: rotate(4deg);
          -webkit-animation: makeItRain 1000ms infinite ease-out;
          -webkit-animation-delay: 307ms;
          -webkit-animation-duration: 1132ms;
      }
      .confetti-piece:nth-child(12) {
          left: 84%;
          -webkit-transform: rotate(42deg);
          -webkit-animation: makeItRain 1000ms infinite ease-out;
          -webkit-animation-delay: 464ms;
          -webkit-animation-duration: 776ms;
      }
      .confetti-piece:nth-child(13) {
          left: 91%;
          -webkit-transform: rotate(-72deg);
          -webkit-animation: makeItRain 1000ms infinite ease-out;
          -webkit-animation-delay: 429ms;
          -webkit-animation-duration: 818ms;
      }
      .confetti-piece:nth-child(odd) {
          background: #7431e8;
      }
      .confetti-piece:nth-child(even) {
          z-index: 1;
      }
      .confetti-piece:nth-child(4n) {
          width: 5px;
          height: 12px;
          -webkit-animation-duration: 2000ms;
      }
      .confetti-piece:nth-child(3n) {
          width: 3px;
          height: 10px;
          -webkit-animation-duration: 2500ms;
          -webkit-animation-delay: 1000ms;
      }
      .confetti-piece:nth-child(4n-7) {
        background: red;
      }
      @-webkit-keyframes makeItRain {
          from {opacity: 0;}
          50% {opacity: 1;}
          to {-webkit-transform: translateY(350px);}
      }
        `}
      </style>
      <div className="confetti">
        <div className="confetti-piece"/>
        <div className="confetti-piece"/>
        <div className="confetti-piece"/>
        <div className="confetti-piece"/>
        <div className="confetti-piece"/>
        <div className="confetti-piece"/>
        <div className="confetti-piece"/>
        <div className="confetti-piece"/>
        <div className="confetti-piece"/>
        <div className="confetti-piece"/>
        <div className="confetti-piece"/>
        <div className="confetti-piece"/>
        <div className="confetti-piece"/>
      </div>
      <SuccessSVG/>
    </Box>
  )
}

const PaymentFailed = ({transaction, setTransaction}: PaymentLoaderProps) => {
  return (
    <Grid container>
      <Grid xs={12} item sx={{textAlign: "center", color: 'danger.main'}}>
        <SentimentVeryDissatisfiedTwoToneIcon color={"warning"}
                                              sx={{fontSize: "8rem", marginTop: "5rem", textAlign: "center"}}/>
        <Typography variant={"h2"}>Payment Failed</Typography>
        <Typography component={'p'}>{transaction.reason_failed}</Typography>
        <Button
          color={"error"}
          sx={{
            marginY: "4rem"
          }}
          onClick={
            () => {
              setTransaction(undefined)
            }
          }
          variant={"contained"} startIcon={<RefreshIcon/>}>Try Again</Button>
      </Grid>
    </Grid>
  )
}

const PaymentLoader = ({subscription, transaction, setTransaction}: PaymentLoaderProps) => {
  useInterval(
    () => {
      getInstance().post('payments/subscription-status', {
        id: transaction.id
      }).then(
        (response) => {
          setTransaction(response.data)
        }
      )
    },
    transaction.state == "pending" ? 1000 * 2 : 0
  )

  if (transaction.state == "success") {
    return <PaymentSuccess transaction={transaction} setTransaction={setTransaction}/>
  }
  if (transaction.state == "failed") {
    return <PaymentFailed transaction={transaction} setTransaction={setTransaction}/>
  }
  return (
    <Box sx={{width: '100%'}}>
      <PaymentSVG/>
      <div style={{textAlign: 'center'}}>
        <Typography variant={"h4"} color={"#7c855e"}>Awaiting Payment ....</Typography>
        <h5>Enter your MPESA PIN on your phone to pay</h5>
        <h6>Ksh. {transaction.amount}</h6>
      </div>
      <LinearProgress color={"secondary"}/>
    </Box>
  )
}

export default PaymentLoader
