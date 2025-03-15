"use client";
import React, { useState, useEffect } from "react";

const ES_and_LS: React.FC = () => {
    // State for ES, Duration, and LS
    const [durationTime, setDurationTime] = useState<number>(0);
    const [ES, setES] = useState<number>(0);
    const [LS, setLS] = useState<number>(0);

    // Update LS whenever ES or durationTime changes
    useEffect(() => {
        setLS(ES + durationTime);
    }, [ES, durationTime]);

    // Handle input changes
    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setDurationTime(value);
    };

    const handleESChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setES(value);
    };

    return (
        <div className="flex h-full w-full items-center justify-center ">
            <div className="bg-white text-gray-900 w-96 p-6 rounded-3xl shadow-2xl flex flex-col gap-6 border border-gray-200">
                {/* Activity Name & Duration */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-extrabold text-indigo-600">Activity A</h1>
                    <div className="relative">
                        <input
                            type="text"
                            value={durationTime}
                            onChange={handleDurationChange}
                            className="w-28 p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-400 outline-none text-lg font-semibold bg-gray-100"
                            min={0}
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">Time</span>
                    </div>
                </div>

                {/* ES & LS Fields */}
                <div className="flex justify-between items-center">
                    <div className="relative">
                        <input
                            type="text"
                            value={ES}
                            onChange={handleESChange}
                            className="w-28 p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-400 outline-none text-lg font-semibold bg-gray-100"
                            min={0}
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">ES</span>
                    </div>
                    <span className="text-xl font-bold text-red-500 bg-red-100 px-4 py-2 rounded-lg shadow-sm">
                        <label className="text-gray-700 mr-2">This is ⇒ </label>
                        {LS} LS
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ES_and_LS;