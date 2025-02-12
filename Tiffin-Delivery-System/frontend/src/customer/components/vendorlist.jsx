import React from 'react';

const VendorCard = ({ vendor }) => {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{vendor.name}</h5>
        <p className="card-text"><strong>Address:</strong> {vendor.address}</p>
        <p className="card-text"><strong>Rating:</strong> {vendor.rating} ★</p>
      </div>
    </div>
  );
};

export default VendorCard;
