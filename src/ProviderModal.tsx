import {
  Button,
  Fab,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  SxProps,
  TextField,
  Box,
  Typography
} from "@mui/material";
import {Provider, Subscription} from "../types";
import List from '@mui/material/List';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {useState} from "react";
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';


type ProviderModalProps = {
  provider?: Provider
  handleClose: () => void
}


const style:SxProps = {
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
  backgroundColor: 'background.paper',
  border: 'rgba(255,255,255,0.5)',
  boxShadow: 24,
  borderRadius: "1rem"
}

type SubscriptionProps = {
  subscription: Subscription
}


const Subscription = ({subscription}: SubscriptionProps) => {
  const [isForm, setIsForm] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>("")
  const phoneIsValid = phone.length == 10 && (phone.startsWith("01") || phone.startsWith("07"));

  return (
    <ListItem
      disablePadding
      sx={{
        borderRadius: "0.5rem",
        marginBottom: "1rem",
        boxShadow: "0px 1px 1px -1px #7c30d8,0px 1px 1px 0px #7c30d8,0px 1px 4px 0px #7c30d8"
      }}>
      <form onSubmit={(e) => {
        e.preventDefault()
      }} style={{width: '100%'}}>
        <ListItemButton sx={{padding: "1.5rem"}}>
          {!isForm ?
            <>
              <ListItemText primary={subscription.name} secondary={subscription.description?.slice(0, 20) + "..."}/>
              <ListItemText sx={{textAlign: "right", marginRight: '2rem'}} primary={`Ksh.${subscription.price}`}
                            secondary={`every ${subscription.count} ${subscription.interval}(s)`}/>
            </>
            : <ListItemText
              primary={subscription.name}
              secondary={`Ksh.${subscription.price}/${subscription.count} ${subscription.interval}(s)`}/>
          }
          {isForm &&
          <TextField
            error={!phoneIsValid}
            defaultValue={'254'}
            helperText={"Format e.g 0122334443 ,0722334443 "}
            required sx={{marginRight: '2rem'}}
            onChange={e => {
              setPhone(e.target.value)
            }}
            id="phone"
            label="Phone Number"
            variant="standard"/>
          }
          <Button
            startIcon={<AttachMoneyIcon/>}
            size={"small"}
            type={isForm ? "submit" : undefined}
            variant={'contained'}
            onClick={() => {
              setIsForm(true)
            }}>
            Pay Now
          </Button>
        </ListItemButton>
      </form>
    </ListItem>
  )
}

type SubscriptionListProps = {
  subscriptions: Subscription[]
}

const SubscriptionList = ({subscriptions}: SubscriptionListProps) => {
  return (
    <List sx={{paddingY: "2rem"}}>
      {subscriptions.map(
        (subscription, index) => {
          return <Subscription key={index} subscription={subscription}/>
        }
      )}
    </List>
  )
}


const ProviderModal = ({handleClose, provider}: ProviderModalProps) => {
  if (!provider) return null;
  return (
    <Modal open={Boolean(provider)} onClose={handleClose}>
      <>
        {provider &&
        <Box sx={style}>
          <Fab onClick={() => handleClose()} sx={{
            position: 'absolute',
            right: "1rem",
          }} color="primary" aria-label="add">
            <CloseTwoToneIcon/>
          </Fab>
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

          <SubscriptionList subscriptions={provider.subscriptions}/>
        </Box>
        }
      </>
    </Modal>
  )
}

export default ProviderModal;
