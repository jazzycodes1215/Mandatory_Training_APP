import {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Button, List, ListItem, ListItemText, IconButton, Accordion, AccordionSummary, AccordionDetails
  , ListItemButton, ListItemIcon, Checkbox, InputLabel, Select, MenuItem } from '@mui/material';
  import InfoIcon from '@mui/icons-material/Info';
export default function AdminTickets({ticketList, setFunc, getValue}) {

  console.log(ticketList);
  let tickets = ticketList?.map((element, index)=>{
    return (
        <ListItem
            key={index}
            disableGutters
            style={{'marginBottom': '20px', padding: 0}}
            secondaryAction={<Link to={`/training-UTM/${element.training_id}`}>
            <IconButton aria-label="info">
            <InfoIcon />
            </IconButton>
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
    primary={`${element.email} ${element.description}`}
    />
    </ListItem>)})

    console.log(tickets);
  return tickets;
}