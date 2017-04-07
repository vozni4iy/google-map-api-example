import React, { Component } from 'react';

const CancelButton = ({onCancel, mode}) => ((mode) ? (
  <button className="map-menu map-cancel" onClick={onCancel}>
    <i className="fa fa-times"></i>
  </button>
) : null);

export default CancelButton;
