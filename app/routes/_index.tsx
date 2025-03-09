"use client";
import { useState, useEffect } from "react";
import { RiMoonFill, RiSunFill, RiDeleteBin6Line } from "react-icons/ri";
import Field from "~/component/Field";
import Footer from "~/component/Footer";

export default function Index() {
  const [fields, setFields] = useState([{ id: 0, total: 0 }]);
  const [finalTotal, setFinalTotal] = useState(0);
  const [resetFields, setResetFields] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load Dark Mode Preference on Mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      setDarkMode(true);
    }
  }, []);

  // Toggle Dark Mode & Save to Local Storage
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString()); // Save preference
      return newMode;
    });
  };

  // Add New Field
  const addNewField = () => {
    setFields([...fields, { id: fields.length, total: 0 }]);
  };

  // Delete Field
  const deleteField = (id: number) => {
    if (fields.length > 1) {
      setFields(fields.filter((field) => field.id !== id));
    }
  };

  // Update total for each field
  const updateTotal = (id: number, total: number) => {
    setFields((prevFields) =>
      prevFields.map((field) => (field.id === id ? { ...field, total } : field))
    );
  };

  // Calculate Final Total
  const calculateFinalTotal = () => {
    const sum = fields.reduce((acc, field) => acc + field.total, 0);
    setFinalTotal(Math.round(sum * 10) / 10);
  };

  // Clear all fields
  const clearFields = () => {
    setResetFields(true);
    setTimeout(() => setResetFields(false), 100);
    setFields([{ id: 0, total: 0 }]);
    setFinalTotal(0);
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } w-full h-screen flex flex-col justify-start items-center p-6 transition duration-300`}
    >
      {/* Toggle Dark Mode Button */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-2 bg-gray-800 text-yellow-400 rounded-full shadow-md hover:bg-gray-700 transition duration-300"
      >
        {darkMode ? <RiSunFill size={20} /> : <RiMoonFill size={20} />}
      </button>

      {/* Calculator Card */}
      <div
        className={`${
          darkMode ? "bg-gray-800" : "bg-white text-black"
        } p-6 shadow-md rounded-lg w-96 flex flex-col gap-4`}
      >
        <h1 className="text-xl font-semibold text-center">Calculator</h1>

        {fields.map((field) => (
          <div key={field.id} className="flex items-center gap-2">
            <Field
              onTotalChange={(total) => updateTotal(field.id, total)}
              reset={resetFields}
            />
            {fields.length > 1 && (
              <button
                onClick={() => deleteField(field.id)}
                className="pl-2 text-red-500 hover:text-red-700 transition duration-300"
              >
                <RiDeleteBin6Line size={20} />
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addNewField}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          ➕ Add New Field
        </button>
      </div>

      {/* Final Total Card */}
      <div
        className={`${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        } mt-6 p-4 shadow-md rounded-lg w-96 flex flex-col items-center gap-2`}
      >
        <h2 className="text-lg font-semibold">
          Final Total: <span className="text-blue-500">{finalTotal}</span>
        </h2>
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

      <Footer />
    </div>
  );
}
