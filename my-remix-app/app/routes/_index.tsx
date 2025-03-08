import React, { useState } from "react";
import Field from "~/component/Field";

export default function Index() {
  const [fields, setFields] = useState([{ id: 0, total: 0 }]); // Store fields with total
  const [finalTotal, setFinalTotal] = useState(0); // Final total

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

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="p-10 bg-gray-400 flex flex-col gap-4">
        {fields.map((field) => (
          <Field key={field.id} onTotalChange={(total) => updateTotal(field.id, total)} />
        ))}
        <button onClick={addNewField} className="bg-red-200 p-2 rounded-xl">
          Add new Field
        </button>
      </div>

      <div className="flex flex-col gap-4 pl-9">
        <h1>Final Total: {finalTotal}</h1>
        <button onClick={calculateFinalTotal} className="bg-green-200 p-2 rounded-xl">
          Final Calculate Total
        </button>
      </div>
    </div>
  );
}
