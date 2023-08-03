import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

export default function FadeAwayMessage({ message, duration = 3000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration * 1.5);

    return () => clearTimeout(timer);
  }, [duration]);
  if (!visible) return null;
  //I do not know why passing duration doesn't work. It works if you give it a specific number. Anything else though? right out. Don't even try
  return <Message duration={duration}>{message}</Message>;
  //This does not work. It lasts for about 10 seconds then disappears
  //return <Message duration={duration}>{message}</Message>;
}

const fadeout = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const Message = styled.div.attrs(props => {
  //Don't ask me why this works.
  console.log(props);
})`
  opacity: 1;
  animation: ${fadeout} ${(props) => (props.duration/1000) || 3}s forwards;
`;