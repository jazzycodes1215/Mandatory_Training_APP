import {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Button, List, ListItem, ListItemText, IconButton, Accordion, AccordionSummary, AccordionDetails
  , ListItemButton, ListItemIcon, Checkbox, InputLabel, Select, MenuItem } from '@mui/material';
  import InfoIcon from '@mui/icons-material/Info';
export default function AdminTickets({ticketList, setFunc, getValue}) {

  if(!ticketList[0])
  {
    return;
  }
  let tickets = ticketList?.map((element, index)=>{
    return (
        <ListItem
            key={index}
            disableGutters
            style={{'marginBottom': '20px', padding: 0}}
            secondaryAction={<Link to={`/training-UTM/${element.training_id}`}>
            <p>{element.ticketclosed}</p>
        </Link>}
    >
    <ListItemButton role={undefined} onClick={() => setFunc(element.id)} dense>
        <ListItemIcon style={{width: '50px'}}>
            <Checkbox
            edge="start"
            checked={element.id === getValue ? true : false}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': element.id }}
            style={{width: '20px'}}
            />
        </ListItemIcon>
    </ListItemButton>
    <ListItemText
    style={{ width: "90%" }}
    primary={`Issue: ${element.description}`}
    secondary={`User: ${element.email} - Ticket Status: ${element.ticketclosed ? "Closed" : "Open"}`}
    />
    <Link to={`/training-UTM/${element.training_id}`}>
        <IconButton sx={{marginRight: '5px'}}edge="end" aria-label="info">
          <InfoIcon />
        </IconButton>
      </Link>
    </ListItem>)})
  return tickets;
}