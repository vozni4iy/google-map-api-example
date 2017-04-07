import React, { Component } from 'react';

const EraseButton = ({onErase, mode}) => ((mode) ? (
  <button className="map-menu map-erase" onClick={onErase}>
    <i className="fa fa-eraser"></i>
  </button>
) : null);

export default EraseButton;
