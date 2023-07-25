import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App';
import UtmUnitReadiness from './UtmUnitReadiness';
import UtmTrainingManagement from './UtmTrainingManagement';
import UtmPersonnelManagement from './UtmPersonnelManagement';
import UtmNotifications from './UtmNotifications';

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
      <button onClick={() => handleTabChange('notifications')}>Notifications</button>
      <button onClick={() => handleTabChange('unitReadiness')}>Unit Readiness</button>
      <button onClick={() => handleTabChange('manageTraining')}>Manage Training</button>
      <button onClick={() => handleTabChange('managePersonnel')}>Manage Personnel</button>
    
      {/* Conditional rendering based on the selected tab */}
      {selectedTab === 'notifications' && (
      <UtmNotifications />
      )}
    
      {selectedTab === 'unitReadiness' && (
      <UtmUnitReadiness />
      )}
    
      {selectedTab === 'manageTraining' && (
      <UtmTrainingManagement />
      )}
    
      {selectedTab === 'managePersonnel' && (
      <UtmPersonnelManagement />
      )}
    </>
  );
};
