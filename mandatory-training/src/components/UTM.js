  import { useState, useEffect, useContext, createContext } from 'react';
  import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
  import styled from 'styled-components';
  import { AppContext, fetchURL } from '../App';
  import UtmUnitReadiness from './UtmUnitReadiness';
  import UtmPersonnelManagement from './UtmPersonnelManagement';
  import UtmNotifications from './UtmNotifications';
  import { Training } from '.';

  export default function UTM() {
    const initialSelectedTab = localStorage.getItem('selectedTab') || 'notifications';
    const [selectedTab, setSelectedTab] = useState(initialSelectedTab);

    useEffect(() => {
      localStorage.setItem('selectedTab', selectedTab);
    }, [selectedTab]);

    const handleTabChange = (tab) => {
      setSelectedTab(tab);
    };

    return (
      <>
        {/* Buttons for notifications, unit readiness, and manage training */}
        <Button onClick={() => handleTabChange('notifications')}>Notifications</Button>
        <Button onClick={() => handleTabChange('unitReadiness')}>Unit Readiness</Button>
        <Button onClick={() => handleTabChange('manageTraining')}>Manage Training</Button>
        <Button onClick={() => handleTabChange('managePersonnel')}>Manage Personnel</Button>

        {/* Conditional rendering based on the selected tab */}
        {selectedTab === 'notifications' && (
        <UtmNotifications />
        )}

        {selectedTab === 'unitReadiness' && (
        <UtmUnitReadiness />
        )}

        {selectedTab === 'manageTraining' && (
        <Training />
        )}

        {selectedTab === 'managePersonnel' && (
        <UtmPersonnelManagement />
        )}
      </>
    );
  };

  const Button = styled.button`
      background-color: MidnightBlue;
      color: white;
      font-size: 1em;
      margin: 1em;
      padding: 0.25em 1em;
      border: 2px solid #007BFF;
      border-radius: 3px;
      cursor: pointer;

      &:hover {
          background-color: white;
          color: #007BFF;
      }

      &:focus {
          outline: none;
          border: 2px solid #0056b3; // Darker blue border
      }
  `;