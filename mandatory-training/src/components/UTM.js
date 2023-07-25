import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App'

export default function UTM() {
  const [selectedTab, setSelectedTab] = useState('notifications');
  
  const UTMContainer = styled.div`
  `;

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  
  return (
    <UTMContainer>
    {/* Buttons for notifications, unit readiness, and manage training */}
    <button onClick={() => handleTabChange('notifications')}>Notifications</button>
    <button onClick={() => handleTabChange('unitReadiness')}>Unit Readiness</button>
    <button onClick={() => handleTabChange('manageTraining')}>Manage Training</button>
  
    {/* Conditional rendering based on the selected tab */}
    {selectedTab === 'notifications' && (
      <div>
      <h2>Notifications Section</h2>
      {/* Add the sub-menu content for the Notifications section */}
      </div>
    )}
  
    {selectedTab === 'unitReadiness' && (
      <div>
      <h2>Unit Readiness Section</h2>
      {/* Add the input and download button for filtering and downloading training */}
      </div>
    )}
  
    {selectedTab === 'manageTraining' && (
      <div>
      <h2>Manage Training Section</h2>
      {/* Add the content for the Manage Training section */}
      </div>
    )}
    </UTMContainer>
  );
};
