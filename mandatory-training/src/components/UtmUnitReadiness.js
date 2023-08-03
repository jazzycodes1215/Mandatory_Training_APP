import React, { useState, useEffect } from 'react';
import { fetchURL } from '../App'
import useUserCheck from '../hooks/useUserCheck';
import UtmReadinessTable from './UtmReadinessTable';
import UtmUnitReport from './UtmUnitReport'
import '../stylesheets/UtmUnitReadiness.css';

export default function UtmUnitReadiness() {
  const [unitReadinessData, setUnitReadinessData] = useState(null);
  const { unitID } = useUserCheck();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUnitReadinessData = async () => {
      try {
        if (!unitID) {
          return;
        }
        const response = await fetch(`${fetchURL}/unit/status/${unitID}`);
        if (response.ok) {
          const data = await response.json();
          setUnitReadinessData(data);
        } else {
          const errorData = await response.text();
          console.error('Error fetching unit readiness data:', errorData);
          throw new Error('Failed to fetch unit readiness data');
        }
      } catch (error) {
        console.error('Error fetching unit readiness data:', error);
        setError(error.message);
      }
    };

    fetchUnitReadinessData();
  }, [unitID]);

  return (
    <div className="readiness-container">
      <div>
      <div className='subheading'>
        <h1>Unit Readiness</h1>
        <UtmUnitReport unitReadinessData={unitReadinessData} />
     </div>
        {unitReadinessData ? (
          <>
            <UtmReadinessTable unitReadinessData={unitReadinessData} />
          </>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
