import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import './Style.css'; // For custom styling

const App = ({deviceName, onRemove}) => {
  const [highestZIndex, setHighestZIndex] = useState(1);
  const [zIndices, setZIndices] = useState([1, 2, 3, 4]);  

  const bringToFront = (index) => {
    const newZIndices = [...zIndices];
    newZIndices[index] = highestZIndex + 1;  
    setZIndices(newZIndices);
    setHighestZIndex(highestZIndex + 1); 
  };
  const handleRemove = () => {
    if (onRemove ) {
      onRemove();
    }
  }

  return (
    <div className="container">
      {[0].map((index) => (
        <Rnd
          key={index}
          minWidth={130}
          minHeight={150}
          bounds=".container"
          className="draggable"
          style={{ zIndex: zIndices[index] }}  
          onMouseDown={() => bringToFront(index)}  
        >
               <div className="window-header">
             <span className="window-title">{deviceName}</span>
             <div className="window-controls">
                <button className="window-button">--</button>
                <button className="window-button">[]</button>
                <button className="window-button" onClick={handleRemove}>X</button>
              </div>
           </div>
           <div className="window-body">
             <p>Hello World!</p>
           </div>
        </Rnd>
      ))}
    </div>
  );
};

export default App;









 
