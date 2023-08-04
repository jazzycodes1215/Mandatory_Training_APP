  import { useState, useEffect, useContext, createContext } from 'react';
  import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
  import styled from 'styled-components';
  import { AppContext, fetchURL } from '../App';
  import UtmUnitReadiness from './UtmUnitReadiness';
  import UtmPersonnelManagement from './UtmPersonnelManagement';
  import UtmNotifications from './UtmNotifications';
  import { Training } from '.';
  import UtmUploadView from './UtmUploadView'
  import '../stylesheets/UtmNotifications.css'

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
        <Button onClick={() => handleTabChange('notifications')} title="View and process notifications">Notifications</Button>
        <Button onClick={() => handleTabChange('viewUploads')} title="View and download certificates">Certificates</Button>
        <Button onClick={() => handleTabChange('managePersonnel')} title="View an individual's training status">Individual Reports</Button>
        <Button onClick={() => handleTabChange('unitReadiness')} title="View your Unit's Readiness Report">Unit Report</Button>
        <Button onClick={() => handleTabChange('manageTraining')} title="Manage training details">Training</Button>

        {selectedTab === 'notifications' && (
        <UtmNotifications />
        )}

        {selectedTab === 'viewUploads' && (
        <UtmUploadView />
        )}

        {selectedTab === 'managePersonnel' && (
        <UtmPersonnelManagement />
        )}

        {selectedTab === 'unitReadiness' && (
        <UtmUnitReadiness />
        )}

        {selectedTab === 'manageTraining' && (
        <Training />
        )}
      </>
    );
  };

  const Button = styled.button`
      background-color: black;
      color: white;
      font-size: .75em;
      margin: 30px 1em 0 1em ;
      padding: 0.4em 1em;
      border: none;
      border-radius: 3px;
      cursor: pointer;

      &:hover {
         transition: all .5s ease;
          background-color: white;
          color: #007BFF;
          border: 1px #007BFF solid;
      }
  `;