"use client";
import { useState, useEffect, useCallback } from "react";
import Draggable from "react-draggable";
import { RiMoonFill, RiSunFill, RiDeleteBin6Line } from "react-icons/ri";
import Field from "~/component/Field";
import Footer from "~/component/Footer";

export default function Index() {
  const [fields, setFields] = useState([{ id: 0, total: 0 }]);
  const [darkMode, setDarkMode] = useState(false);
  const [finalTotal,setFinalTotal]= useState<number>(0)
  const [resetFields, setResetFields] = useState(false);
  const [dragPositions, setDragPositions] = useState<{ [key: number]: number }>({});
  const [showDelete, setShowDelete] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString());
      return newMode;
    });
  };

  const addNewField = () => {
    setFields((prevFields) => [...prevFields, { id: prevFields.length, total: 0 }]);
  };

  const deleteField = (id: number) => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== id));
    setShowDelete((prev) => ({ ...prev, [id]: false }));
    setDragPositions((prev) => ({ ...prev, [id]: 0 })); // Reset position
  };

  const updateTotal = (id: number, total: number) => {
    setFields((prevFields) =>
      prevFields.map((field) => (field.id === id ? { ...field, total } : field))
    );
  };

  // Calculate Final Total
  const calculateFinalTotal = () => {
    console.log("Current fields:", fields); // Debugging
    const sum = fields.reduce((acc, field) => acc + field.total, 0);
  
    console.log("Calculated Sum:", sum); // Debugging
    setFinalTotal(Math.round(sum * 10) / 10);
  };
  

  const clearFields = useCallback(() => {
    setFields([{ id: 0, total: 0 }]);
    setFinalTotal(0);
    setResetFields(true);

    setTimeout(() => {
      setResetFields(false);
    }, 100);
  }, []);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} w-full h-screen flex flex-col justify-start items-center p-6 transition duration-300`}>
      {/* Toggle Dark Mode */}
      <button onClick={toggleDarkMode} className="fixed top-4 right-4 p-2 bg-gray-800 text-yellow-400 rounded-full shadow-md hover:bg-gray-700 transition duration-300">
        {darkMode ? <RiSunFill size={20} /> : <RiMoonFill size={20} />}
      </button>

      {/* Calculator Card */}
      <div className={`${darkMode ? "bg-gray-800" : "bg-white text-black"} p-6 shadow-md rounded-lg w-96 flex flex-col gap-4`}>
        <h1 className="text-xl font-semibold text-center">Calculator</h1>


        {fields.map((field) => (
          <div key={field.id} className="relative flex items-center w-full overflow-hidden">
            {/* Delete Button (Appears When Dragged Left) */}
            <button
              onClick={() => deleteField(field.id)}
              className={`absolute right-2 bg-red-500 text-white p-2 rounded-md shadow-md transition duration-300 
                ${dragPositions[field.id] === -80 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <RiDeleteBin6Line size={20} />
            </button>

            {/* Draggable Field */}
            <Draggable
              axis="x"
              bounds={{ left: -80, right: 0 }}
              position={{ x: dragPositions[field.id] ?? 0, y: 0 }}
              handle=".drag-handle" // Only drag when grabbing this area
              cancel="input" // Allow input clicks
              onStop={(e, data) => {
                if (data.x < -50) {
                  setDragPositions((prev) => ({ ...prev, [field.id]: -80 })); // Fix position left
                } else {
                  setDragPositions((prev) => ({ ...prev, [field.id]: 0 })); // Snap back
                }
              }}
              onDrag={(e, data) => {
                setDragPositions((prev) => ({ ...prev, [field.id]: data.x }));
              }}
            >
              {/* Drag Handle - Users can grab this to drag */}
              <div className="w-full cursor-grab drag-handle p-3 rounded-lg text-black shadow-sm transition duration-300">
                <Field onTotalChange={(total) => updateTotal(field.id, total)} reset={resetFields} />
              </div>
            </Draggable>
          </div>
        ))}


        <button onClick={addNewField} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300">
          ➕ Add New Field
        </button>
      </div>

      {/* Final Total Card */}
      <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} mt-6 p-4 shadow-md rounded-lg w-96 flex flex-col items-center gap-2`}>
        <h2 className="text-lg font-semibold">
          Final Total: <span className="text-blue-500">{finalTotal}</span>
        </h2>
        <button onClick={calculateFinalTotal} className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-300">
          ✅ Final Calculate Total
        </button>
        <button onClick={clearFields} className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition duration-300">
          ❌ Clear All
        </button>
      </div>

      <Footer />
    </div>
  );
}
