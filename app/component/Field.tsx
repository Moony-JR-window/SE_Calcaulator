import React, { useState, useEffect } from "react";

interface FieldProps {
  onTotalChange: (total: number) => void;
  reset: boolean;
}

const Field: React.FC<FieldProps> = ({ onTotalChange, reset }) => {
  const [number, setNumber] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (reset) {
      setNumber(0);
      setPercentage(0);
      setTotal(0);
      onTotalChange(0);
    }
  }, [reset, onTotalChange]);

  useEffect(() => {
    const newTotal = (number * percentage) / 100;
    setTotal(newTotal);
    onTotalChange(newTotal);
  }, [number, percentage, onTotalChange]);

  return (
    <div className="flex items-center gap-2 border p-3 rounded-lg bg-gray-50 shadow-sm">
      <input
        type="text"
        className="w-24 p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
        placeholder="Number"
        value={number}
        onChange={(e) => setNumber(e.target.value === "" ? 0 : parseFloat(e.target.value))}
      />
      <span className="text-lg">×</span>
      <input
        type="text"
        className="w-16 p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
        placeholder="%"
        value={percentage}
        onChange={(e) => setPercentage(e.target.value === "" ? 0 : parseFloat(e.target.value))}
      />
      <span className="text-lg">%</span>
      <span className="text-green-600 font-semibold ml-2">= {total.toFixed(1)}</span>
    </div>
  );
};

export default Field;
