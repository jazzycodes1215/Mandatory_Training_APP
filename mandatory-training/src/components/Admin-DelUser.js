import {useState, useEffect} from 'react'
import { Box, Button, List, ListItem, ListItemText, IconButton, Accordion, AccordionSummary, AccordionDetails
  , ListItemButton, ListItemIcon, Checkbox, InputLabel, Select, MenuItem } from '@mui/material';


export default function AdminUserDelete({userList, setFunc, getValue}) {
  const UserRole = (roleId) => {
    switch(roleId) {
        case 1:
            return 'Unverified User'
        case 2:
            return 'User'
        case 3:
            return 'UTM'
        case 4:
            return 'Admin'
      }
  }

  let delUser = userList?.map((element, index)=>{
    return (
        <ListItem
            key={index}
            disableGutters
            style={{'marginBottom': '20px', padding: 0}}
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
    primary={`${element.last_name} ${element.first_name}`}
    secondary={UserRole(element.role_id)}
    />
    </ListItem>)})
  return delUser;
}