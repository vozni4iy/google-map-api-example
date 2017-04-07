import { default as React, Component} from "react";
import {withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import SearchBox from "react-google-maps/lib/places/SearchBox";
import Polygon from "react-google-maps/lib/Polygon";
import {INPUT_STYLE} from './constants/GoogleMap';
import DrawManager from './DrawManager';

const GoogleMapExample = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    mapTypeId={google.maps.MapTypeId.SATELLITE}
    defaultOptions={{
      mapTypeControl: false,
      streetViewControl: false
    }}
    onBoundsChanged={props.onBoundsChanged}
    onMouseMove={props.onMouseMove}
  >
      <DrawManager
        erase={props.erase}
        onMounted={props.onDrawingManagerMounted}
        drawingMode={props.drawingMode}
        onPolygonComplete={props.onPolygonComplete}
        />
      <SearchBox
          ref={props.onSearchBoxMounted}
          bounds={props.bounds}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={props.onPlacesChanged}
          inputPlaceholder="Search..."
          inputStyle={INPUT_STYLE}
        />
    <Polygon
        ref={props.onPolygonMounted}
        path={props.path}
        editable={props.editable}
        draggable={props.draggable}
    />
      {props.markers.map((marker, index) => (
        <Marker position={marker.position} key={index} />
      ))}
  </GoogleMap>
));

export default GoogleMapExample;
