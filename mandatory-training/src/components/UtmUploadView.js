import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { AppContext, fetchURL } from '../App';
import useUserCheck from '../hooks/useUserCheck';
import { Box, Button, List, ListItem, ListItemText, IconButton, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import FileList from './FileList'

export default function UtmUploadView() {
  const {validatedUserType, unitID} = useUserCheck();
  const [unitData, setUnitData] = useState([]);

  const fetchUnitData = async () => {
    try {
      if(!unitID)
      {
        return;
      }
      const response = await fetch(`${fetchURL}/units/users/${unitID}`);
      const data = await response.json();
      setUnitData(data);

  } catch (error) {
      console.error('Error fetching your required training', error);
    }
  }
  useEffect(()=> {
    fetchUnitData();
  }, [unitID])
  return (
    <GridContainer>
      {unitData ? unitData.map((element, index)=> {
        return (
          <ItemWrapper key={index}>
            <Title>{element.rank} {element.first_name} {element.last_name}</Title>
            <ScrollableBox>
              <FileList userID={element.id}/>
            </ScrollableBox>
          </ItemWrapper>
        );
      }) : null}
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const Title = styled.h1`
  text-align: center;
`;

const ScrollableBox = styled.div`
  height: 300px;
  width: 100%;
  overflow-y: auto;
  border: 1px solid #ccc;
`;
