"use client";
import React, { useState } from "react";

const ES_and_LS: React.FC = () => {
    // State for Duration, ES, LS, and LF
    const [durationTime, setDurationTime] = useState<number>(0);
    const [ES, setES] = useState<number>(0);
    const [LS, setLS] = useState<number>(0);
    const [LF, setLF] = useState<number>(0);

    // Handle Duration Input Change
    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setDurationTime(value);
        setLS(ES + value); // LS = ES + duration
        setLF(LS + value); // LF = LS + duration
    };

    // Handle ES Change
    const handleESChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setES(value);
        setLS(value + durationTime); // LS recalculates
        setLF(LS + durationTime); // LF recalculates
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-100">
            <div className="bg-blue-500 text-black w-48 h-36 rounded-lg shadow-lg flex flex-col items-center justify-center p-4">
                {/* Activity Name & Duration */}
                <div className="flex justify-between w-full text-center text-sm">
                    <span className="w-10 font-bold">A</span>
                    <input
                        type="text"
                        value={durationTime}
                        onChange={handleDurationChange}
                        className="w-10 rounded-md bg-gray-300 outline-none text-center"
                        maxLength={2}
                    />
                </div>

                {/* ES & LS Fields */}
                <div className="flex justify-between w-full mt-2 text-sm">
                    <input
                        type="text"
                        value={ES}
                        onChange={handleESChange}
                        className="w-10 rounded-md bg-gray-300 outline-none text-center"
                        maxLength={2}
                    />
                    <span className="w-10 rounded-md bg-gray-300 outline-none text-center">{LS} LS</span>
                </div>

                {/* LS & LF Fields */}
                <div className="flex justify-between w-full mt-2 text-sm">
                    <span className="w-10 rounded-md bg-gray-300 outline-none text-center">{LS} LS </span>
                    <span className="w-10 rounded-md bg-gray-300 outline-none text-center">{LF} LF </span>
                </div>
            </div>
        </div>
    );
};

export default ES_and_LS;
