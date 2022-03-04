import {
  Box,
  Button,
  Fab,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  SxProps,
  TextField,
  Typography
} from "@mui/material";
import {Provider, Subscription, Transaction} from "../types";
import List from '@mui/material/List';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {FormEvent, useState} from "react";
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import {getInstance} from "../axios";
import {useRouter} from "next/router";
import PaymentLoader from "./PaymentLoader";


type ProviderModalProps = {
  provider?: Provider
  handleClose: () => void
}


const style: SxProps = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  padding: "1rem",
  transform: 'translate(-50%, -50%)',
  width: {
    xs: "95%",
    md: 600
  },
  height: "90vh",
  overflowY: "auto",
  backgroundColor: "rgba(255,255,255,0.95)",
  border: 'rgba(255,255,255,0.5)',
  boxShadow: 24,
  borderRadius: "1rem"
}

type SubscriptionProps = {
  subscription: Subscription,
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => void,
  isForm: boolean,
  setIsForm: (selected: Subscription) => void
  phoneIsValid: boolean
  setPhone: (phone: string) => void
}


const Subscription = ({
                        subscription,
                        onSubmitHandler,
                        isForm,
                        phoneIsValid,
                        setIsForm,
                        setPhone
                      }: SubscriptionProps) => {

  return (
    <ListItem
      disablePadding
      sx={{
        borderRadius: "0.5rem",
        marginBottom: "1rem",
        boxShadow: "0px 1px 1px -1px #7c30d8,0px 1px 1px 0px #7c30d8,0px 1px 4px 0px #7c30d8"
      }}>
      <form onSubmit={onSubmitHandler} style={{width: '100%'}}>
        <ListItemButton>
          <Grid container sx={{width: '100%'}} justifyContent={'right'}>
            <Grid item xs={12}>
              {!isForm ?
                <ListItemButton>
                  <ListItemText primary={subscription.name} secondary={subscription.description?.slice(0, 20) + "..."}/>
                  <ListItemText sx={{textAlign: "right", marginRight: '2rem'}} primary={`Ksh.${subscription.price}`}
                                secondary={`every ${subscription.count} ${subscription.interval}(s)`}/>
                </ListItemButton>
                :
                <ListItemButton>
                  <ListItemText
                    primary={subscription.name}
                    secondary={`Ksh.${subscription.price}/${subscription.count} ${subscription.interval}(s)`}/>
                  <TextField
                    error={!phoneIsValid}
                    defaultValue={'0'}
                    helperText={"Format e.g 0122334443 ,0722334443 "}
                    required sx={{marginRight: '2rem'}}
                    onChange={e => {
                      setPhone(e.target.value)
                    }}
                    id="phone"
                    label="Phone Number"
                    variant="standard"/>
                </ListItemButton>
              }
            </Grid>
            <Grid item>
              <Button
                startIcon={<AttachMoneyIcon/>}
                disabled={!phoneIsValid && isForm}
                size={"small"}
                type={isForm ? "submit" : undefined}
                variant={'contained'}
                sx={{marginX: "3rem", marginY: "1rem", textAlign: 'left'}}
                onClick={() => {
                  setIsForm(subscription)
                }}>
                Pay Now
              </Button>
            </Grid>
          </Grid>
        </ListItemButton>
      </form>
    </ListItem>
  )
}

type SubscriptionListProps = {
  subscriptions: Subscription[],
  transaction?: Transaction,
  setTransaction: (transaction?: Transaction) => void
}

const SubscriptionList = ({subscriptions, transaction, setTransaction}: SubscriptionListProps) => {
  const [selected, setSelected] = useState<Subscription>()
  const [phone, setPhone] = useState<string>("")
  const phoneIsValid = phone.length == 10 && (phone.startsWith("01") || phone.startsWith("07"));
  const {query} = useRouter()

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getInstance().post('subscriptions/pay', {
      phone: query.phone,
      payment_phone: phone,
      subscription_id: selected?.id,
      organization_id: selected?.organization
    }).then(
      (response) => {
        setTransaction(response.data)
      }
    )
  }
  if (transaction) return <PaymentLoader setTransaction={setTransaction}
                                         transaction={transaction}
                                         subscription={selected as Subscription}/>
  return (
    <>
      <Typography fontSize={"2rem"} textAlign={"center"} fontWeight={"lighter"}> Subscriptions</Typography>
      <Box
        sx={{
          opacity: 0.8,
          width: '100%',
          height: "10rem",
        }}
        component="img"
        alt="Subscriptions"
        src="/subscriptions.svg"/>
      <List sx={{paddingY: "2rem"}}>
        {subscriptions.map(
          (subscription, index) => {
            const isForm = selected?.id == subscription.id
            return <Subscription
              key={index}
              subscription={subscription}
              isForm={isForm}
              onSubmitHandler={onSubmitHandler}
              phoneIsValid={phoneIsValid}
              setIsForm={setSelected}
              setPhone={setPhone}/>
          }
        )}
      </List>
    </>
  )
}


const ProviderModal = ({handleClose, provider}: ProviderModalProps) => {
  const [transaction, setTransaction] = useState<Transaction>()

  if (!provider) return null;

  const closeHandler = () => {
    if (transaction?.state != "pending") {
      setTransaction(undefined)
      handleClose()
    }
  }
  return (
    <Modal open={Boolean(provider)} onClose={closeHandler}>
      <>
        {provider &&
        <Box sx={style}>
          <Fab onClick={closeHandler} sx={{
            position: 'absolute',
            right: "1rem",
            zIndex: 10000
          }} color={"primary"} aria-label="add">
            <CloseTwoToneIcon/>
          </Fab>

          <SubscriptionList transaction={transaction} setTransaction={setTransaction}
                            subscriptions={provider.subscriptions}/>
        </Box>
        }
      </>
    </Modal>
  )
}

export default ProviderModal;
