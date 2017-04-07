import React, { Component } from 'react';
import DrawingManager from "react-google-maps/lib/drawing/DrawingManager";

const DrawManager = ({erase, onMounted, drawingMode,
    onPolygonComplete}) => ((!erase) ? (
  <DrawingManager
      ref={onMounted}
      defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
      drawingMode={drawingMode}
      onPolygonComplete={onPolygonComplete}
      defaultOptions={{
        drawingControl: false,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT,
          drawingModes: [
            google.maps.drawing.OverlayType.POLYGON,
          ]
        },
        markerOptions: {
          editable: true,
          draggable: true
        },
        polygonOptions: {
          editable: true,
          draggable: true
        }
      }}
  />
) : null);

export default DrawManager;
