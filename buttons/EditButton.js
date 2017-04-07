import React, { Component } from 'react';

const EditButton = ({onEdit, mode}) => ((!mode) ? (
  <button className="map-menu map-edit" onClick={onEdit}>
    <i className="fa fa-pencil-square-o"></i>
  </button>
) : null);

export default EditButton;
