import {useState, useEffect} from 'react'
import { Box, Button, List, ListItem, ListItemText, IconButton, Accordion, AccordionSummary, AccordionDetails
  , ListItemButton, ListItemIcon, Checkbox, InputLabel, Select, MenuItem } from '@mui/material';

export default function AdminUserPromote({userList, setFunc, setFunc2, getValue, getValue2}) {
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

      const handleSelect = (e, id) => {
          setFunc2(id)
          setFunc({...getValue2, [id]: e.target.value})
      }

      const handleToggle = (value) =>
      {
          if(getValue === value)
          {
            setFunc2(null);
          }
          setFunc2(value)
      }

      let promUser = userList?.map((element, index)=>{
          return (
              <ListItem
                  key={index}
                  disableGutters
                  style={{'marginBottom': '20px', padding: 0}}
                  align-items={'center'}
                  secondaryAction={
                      <>
                      <InputLabel sx={{'fontSize': '15px', 'marginTop': '2.5vh'}} id="label">Role</InputLabel>
                      <Select sx={{width: '15vw'}} labelId="label" onChange={(e)=>{handleSelect(e, element.id)}}
                      id="select" value={getValue2[element.id] ? getValue2[element.id] : element.role_id}>
                          <MenuItem value="1">Non-verified User</MenuItem>
                          <MenuItem value="2">User</MenuItem>
                          <MenuItem value="3">Unit Training Manager</MenuItem>
                          <MenuItem value="4">Admin</MenuItem>
                      </Select>
                      </>
                  }>
          <ListItemButton role={undefined} onClick={() => handleToggle(element.id)} dense>
              <ListItemIcon style={{width: '50px'}}>
                  <Checkbox
                  edge="start"
                  checked={element.id === getValue ? true : false}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': element.id }}
                  style={{width: '20px'}}/>
              </ListItemIcon>
          </ListItemButton>
          <ListItemText
          style={{ width: "90%" }}
          primary={`${element.last_name} ${element.first_name}`}
          secondary={UserRole(element.role_id)}/>
          </ListItem>
          )})
      return promUser;
  }