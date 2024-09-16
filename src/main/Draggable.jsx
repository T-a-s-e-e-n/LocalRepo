import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import "./Style.css";

const DraggableWindow = ({ deviceName, onRemove }) => {
  const [size, setSize] = useState({ width: 300, height: 200 });
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const resizableRef = useRef(null);

  const handleRemoveClick = () => {
    if (onRemove) {
      onRemove();
    }
  };

  const startResize = (event, direction) => {
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = size.width;
    const startHeight = size.height;
    const startPositionX = position.x;
    const startPositionY = position.y;

    const handleResize = (e) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      switch (direction) {
        case "right":
          setSize((prevSize) => ({ ...prevSize, width: startWidth + dx }));
          break;
        case "bottom":
          setSize((prevSize) => ({ ...prevSize, height: startHeight + dy }));
          break;
        case "left":
          setSize((prevSize) => ({ ...prevSize, width: startWidth - dx }));
          setPosition((prevPosition) => ({
            ...prevPosition,
            x: startPositionX + dx,
          }));
          break;
        case "top":
          setSize((prevSize) => ({ ...prevSize, height: startHeight - dy }));
          setPosition((prevPosition) => ({
            ...prevPosition,
            y: startPositionY + dy,
          }));
          break;
        case "bottom-right":
          setSize(() => ({
            width: startWidth + dx,
            height: startHeight + dy,
          }));
          break;
        case "bottom-left":
          setSize(() => ({
            width: startWidth - dx,
            height: startHeight + dy,
          }));
          setPosition((prevPosition) => ({
            ...prevPosition,
            x: startPositionX + dx,
          }));
          break;
        case "top-right":
          setSize(() => ({
            width: startWidth + dx,
            height: startHeight - dy,
          }));
          setPosition((prevPosition) => ({
            ...prevPosition,
            y: startPositionY + dy,
          }));
          break;
        case "top-left":
          setSize(() => ({
            width: startWidth - dx,
            height: startHeight - dy,
          }));
          setPosition(() => ({
            x: startPositionX + dx,
            y: startPositionY + dy,
          }));
          break;
        default:
          break;
      }
    };

    const stopResize = () => {
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", stopResize);
    };

    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", stopResize);
  };

  return (
    <Draggable
      handle=".window-header"
      position={position}
      onDrag={(e, data) => setPosition({ x: data.x, y: data.y })}
    >
      <div
        ref={resizableRef}
        className="draggable-window"
        style={{ width: size.width, height: size.height }}
      >
        <div className="window-header">
          <span className="window-title">{deviceName}</span>
          <div className="window-controls">
            <button className="window-button">--</button>
            <button className="window-button">[]</button>
            <button onClick={handleRemoveClick} className="window-button">
              X
            </button>
          </div>
        </div>
        <div className="window-body">
          <p> Hellow World!</p>
        </div>

        <div
          className="resizer resizer-r"
          onMouseDown={(e) => startResize(e, "right")}
        ></div>
        <div
          className="resizer resizer-b"
          onMouseDown={(e) => startResize(e, "bottom")}
        ></div>
        <div
          className="resizer resizer-l"
          onMouseDown={(e) => startResize(e, "left")}
        ></div>
        <div
          className="resizer resizer-t"
          onMouseDown={(e) => startResize(e, "top")}
        ></div>
        <div
          className="resizer resizer-br"
          onMouseDown={(e) => startResize(e, "bottom-right")}
        ></div>
        <div
          className="resizer resizer-bl"
          onMouseDown={(e) => startResize(e, "bottom-left")}
        ></div>
        <div
          className="resizer resizer-tr"
          onMouseDown={(e) => startResize(e, "top-right")}
        ></div>
        <div
          className="resizer resizer-tl"
          onMouseDown={(e) => startResize(e, "top-left")}
        ></div>
      </div>
    </Draggable>
  );
};

export default DraggableWindow;
 