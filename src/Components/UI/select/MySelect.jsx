import React from "react";

const MySelect = ({ option, defoultvalue, value, onChange }) => {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      <option disabled value="">{defoultvalue}</option>
      {option.map((option) => (
        <option key={option.value} value={option.value}>{option.name}</option>
      ))}
    </select>
  );
};

export default MySelect;
