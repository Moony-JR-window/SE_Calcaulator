import React, { useState } from "react";
import Field from "~/component/Field";

export default function Index() {
  const [fields, setFields] = useState([{ id: 0, total: 0 }]); // Store fields with total
  const [finalTotal, setFinalTotal] = useState(0); // Final total
  const [resetFields, setResetFields] = useState(false); // Track reset state

  const addNewField = () => {
    setFields([...fields, { id: fields.length, total: 0 }]);
  };

  const updateTotal = (id: number, total: number) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, total } : field
      )
    );
  };

  const calculateFinalTotal = () => {
    const sum = fields.reduce((acc, field) => acc + field.total, 0);
    const roundedSum = Math.round(sum * 10) / 10; // Round to 1 decimal place
    setFinalTotal(roundedSum);
  };

  const clearFields = () => {
    setResetFields(true); // Trigger reset in all fields
    setTimeout(() => setResetFields(false), 100); // Reset back after clearing
    setFields([{ id: 0, total: 0 }]); // Reset fields
    setFinalTotal(0); // Reset final total
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <div className="p-6 bg-white shadow-md rounded-lg w-96 flex flex-col gap-4">
        <h1 className="text-xl font-semibold text-center text-gray-800">Percentage Calculator</h1>

        {fields.map((field) => (
          <Field key={field.id} onTotalChange={(total) => updateTotal(field.id, total)} reset={resetFields} />
        ))}

        <button
          onClick={addNewField}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          ➕ Add New Field
        </button>
      </div>

      <div className="mt-6 p-4 bg-white shadow-md rounded-lg w-96 flex flex-col items-center gap-2">
        <h2 className="text-lg font-semibold text-gray-800">Final Total: <span className="text-blue-500">{finalTotal}</span></h2>
        <button
          onClick={calculateFinalTotal}
          className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          ✅ Final Calculate Total
        </button>
        <button
          onClick={clearFields}
          className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          ❌ Clear All
        </button>
      </div>
    </div>
  );
}
