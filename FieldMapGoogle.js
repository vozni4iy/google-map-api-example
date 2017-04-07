import { default as React, Component} from "react";
import {withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import {GoogleMapExample} from '../../../components/dashboard';
import Polygon from "react-google-maps/lib/Polygon";
import {DEFAULT_CENTER, DEFAULT_PATH} from './constants/GoogleMap';
import {SaveButton, EditButton, CancelButton, EraseButton,
        FieldButton} from './buttons';

export default class FieldMapGoogle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bounds: null,
      path: [],
      erase: false,
      drawingMode: null,
      editMode: false,
      center: DEFAULT_CENTER,
      markers: []
    };
  }

  componentWillReceiveProps(nextProps) {
    let selected = nextProps.selected;
    this.prepareView(selected);
  }

  prepareView(selected) {
    console.log('selected poly: ',selected.polygon);
    console.log(selected);
    if (!selected.polygon) {
      console.log('locate user');
      this.locateUser();
      this.setState({
        path: [],
        editMode: true,
        drawingMode: google.maps.drawing.OverlayType.POLYGON
      });
      this.showSearchBox();
    } else {
      console.log('draw poly');
      let path = (selected.polygon) ? JSON.parse(selected.polygon) : [];
      let center = (selected.lat) ? {lat: selected.lat,lng: selected.lng} : DEFAULT_CENTER;
      this.setState({
        path: path,
        center: center,
        editMode: false,
        drawingMode: null
      });
      this.hideSearchBox();
    }
  }

  locateUser() {
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            let polygon = this.props.selected.polygon;
            if (!polygon) {
              this.setState({
                center: pos
              });
            }
        }.bind(this), function() {
            console.log('error');
          });
      } else {
        console.log('error');
      }
  }

  handleMouseMove() {
    if (this.state.erase) {
      this.setState({
        erase: false
      });
    }
  }

  handleMapMounted(map) {
    this._map = map;
  }

  handleBoundsChanged() {
    let center = this._map.getCenter();
    let mapCenter = {
      lat: center.lat(),
      lng: center.lng()
    };
    this.setState({
      bounds: this._map.getBounds(),
      center: mapCenter
    });
  }

  handleSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;
  }

  handlePlacesChanged() {
    const places = this._searchBox.getPlaces();
    const markers = places.map(place => ({
      position: place.geometry.location,
    }));
    let center = markers.length > 0 ? markers[0].position : this.state.center;
    let mapCenter = {
      lat: center.lat(),
      lng: center.lng()
    };
    this.setState({
      center: mapCenter,
      markers,
    });
  }

  handleDrawingManagerMounted(drawingManager) {
    this._drawingManager = drawingManager;

  }

  handlePolygonMounted(polygon) {
    this._polygon = polygon;
  }

  handlePolygonComplete(polygon) {
    console.log('polygon complete');
    let path = polygon.getPath().getArray();
    polygon.setMap(null);
    this.setState({
      drawingMode: null,
      path: path
    });

  }

  onEdit() {
    console.log('on Edit');
    let editMode = this.state.editMode;
    this.setState({
      editMode: !editMode
    });
    this.showSearchBox();
  }

  hideSearchBox() {
    let wrapper = document.getElementsByClassName('map-wrapper')[0];
    let name = wrapper.className;
    if (name.match(/(?:^|\s)map-searchbox-hide(?!\S)/)) {
        wrapper.className = name.replace(/(?:^|\s)map-searchbox-hide(?!\S)/g, '');
    }
  }

  showSearchBox() {
    let wrapper = document.getElementsByClassName('map-wrapper')[0];
    let name = wrapper.className;
    if (!name.match(/(?:^|\s)map-searchbox-hide(?!\S)/)) {
        wrapper.className += " map-searchbox-hide";
    }
  }

  onCancel() {
    this.setState({
      erase: true
    });
    this.prepareView(this.props.selected);
  }

  onErase() {
    console.log('on Erase');
    this.setState({
      path: [],
      erase: true,
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    });
  }

  onSave() {
      console.log('on Save');
      let center = this.state.center;
      let nextPath = this._polygon.getPath().getArray();
      let sNext = JSON.stringify(nextPath);
      let fieldstate = this.props.selected;
      fieldstate.lat = center.lat;
      fieldstate.lng = center.lng;
      fieldstate.polygon = sNext;
      console.log('fieldstate: ',fieldstate);
      this.props.saveFieldState(fieldstate);
  }

  render() {
    console.log('selected: ' + this.props.selected.field.name);
    let mode = this.state.editMode;
    let isDrawing = this.state.drawingMode;
    return (
      <div className="map-wrapper">
        <SaveButton onSave={::this.onSave} mode={mode} disabled={isDrawing}/>
        <EditButton onEdit={::this.onEdit} mode={mode}/>
        <EraseButton onErase={::this.onErase} mode={mode}/>
        <CancelButton onCancel={::this.onCancel} mode={mode}/>
        <FieldButton name={this.props.selected.field.name} />
        <GoogleMapExample
          containerElement={
            <div style={{ width: '400px', height:'400px' }} />
          }
          mapElement={
            <div style={{ width: '400px', height:'400px' }} />
          }
          center={this.state.center}
          onMouseMove={::this.handleMouseMove}
          onMapMounted={::this.handleMapMounted}
          onPolygonMounted={::this.handlePolygonMounted}
          onPolygonComplete={::this.handlePolygonComplete}
          onBoundsChanged={::this.handleBoundsChanged}
          onSearchBoxMounted={::this.handleSearchBoxMounted}
          onDrawingManagerMounted={::this.handleDrawingManagerMounted}
          bounds={this.state.bounds}
          onPlacesChanged={::this.handlePlacesChanged}
          markers={this.state.markers}
          drawingMode={this.state.drawingMode}
          path={this.state.path}
          editable={this.state.editMode}
          draggable={this.state.editMode}
          erase={this.state.erase}
        />
      </div>
    );
  }
}
