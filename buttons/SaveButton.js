import React, { Component } from 'react';

const SaveButton = ({onSave, mode, disabled}) => ((mode) ? (
  <button className="map-menu map-save" disabled={disabled} onClick={onSave}>
    <i className="fa fa-floppy-o"></i>
  </button>
) : null);

export default SaveButton;
