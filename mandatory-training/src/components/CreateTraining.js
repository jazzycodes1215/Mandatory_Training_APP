import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppContext, fetchURL } from '../App';
import useUserCheck from '../hooks/useUserCheck';

export default function CreateTraining() {
  const [name, setName] = useState('');
  const [interval, setInterval] = useState('');
  const [source, setSource] = useState('');
  const [typeOptions, setTypeOptions] = useState([]);
  const [dutyOptions, setDutyOptions] = useState([]);
  const [type, setType] = useState('');
  const [duty, setDuty] = useState('');

  const { testStr } = useContext(AppContext);

  useEffect(() => {
    fetchTrainingOptions();
  }, []);

  const fetchTrainingOptions = async () => {
    try {
      const typeResponse = await fetch(`${fetchURL}/training/types`);
      const dutyResponse = await fetch(`${fetchURL}/training/duties`);

      if (!typeResponse.ok || !dutyResponse.ok) {
        throw new Error('Failed to fetch training options');
      }

      const typeData = await typeResponse.json();
      const dutyData = await dutyResponse.json();

      setTypeOptions(typeData);
      setDutyOptions(dutyData);
    } catch (error) {
      console.error('Error fetching training options:', error);
    }
  };

  const handleCreateTraining = async () => {
    try {
      const newTraining = {
        name,
        interval,
        source,
        type_id: parseInt(type),
        duty_id: parseInt(duty),
      };

      const response = await fetch(`${fetchURL}/training`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTraining),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('POST request successful:', data);
      // Handle the response data as needed
    } catch (error) {
      console.error('Error making POST request:', error);
      // Handle errors
    }
  };

  return (
    <>
      <h1>This is the Create Training Component!</h1>
      {testStr}
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Interval:</label>
        <input type="text" value={interval} onChange={(e) => setInterval(e.target.value)} />
      </div>
      <div>
        <label>Source:</label>
        <input type="text" value={source} onChange={(e) => setSource(e.target.value)} />
      </div>
      <div>
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {typeOptions.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Duty:</label>
        <select value={duty} onChange={(e) => setDuty(e.target.value)}>
          {dutyOptions.map((duty) => (
            <option key={duty.id} value={duty.id}>
              {duty.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleCreateTraining}>Create Training</button>
    </>
  );
}
