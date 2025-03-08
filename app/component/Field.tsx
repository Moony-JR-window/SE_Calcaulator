import React, { useState, useEffect } from "react";

interface FieldProps {
  onTotalChange: (total: number) => void;
}

const Field: React.FC<FieldProps> = ({ onTotalChange }) => {
  const [number, setNumber] = useState<number | ''>(0);
  const [percentage, setPercentage] = useState<number | ''>(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = number !== '' && percentage !== '' ? (number * percentage) / 100 : 0;
    setTotal(newTotal);
    onTotalChange(newTotal);
  }, [number, percentage, onTotalChange]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter number"
        value={number}
        onChange={(e) => {
          const value = e.target.value === "" ? "" : parseFloat(e.target.value);
          setNumber(value);
        }}
      />
      <span> × </span>
      <input
        type="text"
        placeholder="Enter %"
        value={percentage}
        onChange={(e) => {
          const value = e.target.value === "" ? "" : parseFloat(e.target.value);
          setPercentage(value);
        }}
      />
      <span> % = {total}</span>
    </div>
  );
};

export default Field;
