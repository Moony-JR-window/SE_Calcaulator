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
    }
  }, [reset]);  // Only reset when the `reset` prop changes

  useEffect(() => {
    const newTotal = (number * percentage) / 100;
    setTotal(newTotal);
    onTotalChange(newTotal);  // Notify parent with the new total
  }, [number, percentage, onTotalChange]);  // Only update when `number` or `percentage` change

  return (
    <div className="flex items-center gap-2 border p-3 rounded-lg shadow-sm bg-white transition duration-300">
      <input
        type="text"
        className="w-24 p-2 border rounded-md focus:ring-2 focus:ring-blue-300 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition duration-300"
        placeholder="Number"
        value={number}
        onChange={(e) => setNumber(e.target.value === "" ? 0 : parseFloat(e.target.value))}
      />
      <span className="text-lg text-gray-800 dark:text-gray-300">×</span>
      <input
        type="text"
        className="w-16 p-2 border rounded-md focus:ring-2 focus:ring-blue-300 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition duration-300"
        placeholder="%"
        value={percentage}
        onChange={(e) => setPercentage(e.target.value === "" ? 0 : parseFloat(e.target.value))}
      />
      <span className="text-lg text-gray-800 dark:text-gray-300">%</span>
      <span className="text-green-600 dark:text-green-400 font-semibold ml-2">= {total.toFixed(1)}</span>
    </div>
  );
};

export default Field;
