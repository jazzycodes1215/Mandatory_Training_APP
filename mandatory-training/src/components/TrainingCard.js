import { useState, useEffect, useContext } from 'react';
import { InnerTraining } from './Training';
import { TrainingCard } from './Training';
import { TrainingCardTop } from './Training';
import { TrainingCardMid } from './Training';
import { TrainingCardBot } from './Training';
import { Training } from './Training';


export default function Card(props) {

    
    const [requiredTraining, setRequiredTraining] = useState([])

    useEffect(() => {
        console.log('props:', props.endp)
        fetchRequiredTraining();
    }, []);

    const fetchRequiredTraining = async () => {
        try {
            const response = await fetch(`http://localhost:4000/requiredTraining/${props.endp}`);
            const data = await response.json();
            setRequiredTraining(data);
        } catch (error) {
            console.error('Error fetching your required training', error);
        }
    };


    return(
            <InnerTraining>
                    {requiredTraining.map((training, index) =>
                    <TrainingCard key={index}>
                        <TrainingCardTop>
                        </TrainingCardTop>
                        <TrainingCardMid className='mid'>
                            <p>{training.type_name}</p>
                            <h3>{training.name}</h3>
                        </TrainingCardMid>
                        <TrainingCardBot>
                        </TrainingCardBot>   
                    </TrainingCard> )}
                </InnerTraining>
)}