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

    // Handle Duration Input Change
    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setDurationTime(value);
    };

    // Handle ES Input Change
    const handleESChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setES(value);
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-100">
            <div className="bg-blue-400 text-black w-80 h-36 rounded-lg shadow-lg gap-5 flex flex-col items-center justify-center p-4">
                {/* Activity Name & Duration */}
                <div className="flex justify-between w-full text-center ">
                    <h1 className="w-10 font-bold">A</h1>
                    <div>
                        <input
                            type="text"
                            value={durationTime}
                            onChange={handleDurationChange}
                            className="w-24 p-2 rounded-md bg-gray-300 outline-none  "
                            min={0}
                        />
                        <span className=" ml-[-40px] pointer-events-none ">Time</span>
                    </div>

                </div>

                {/* ES & LS Fields */}
                <div className="flex justify-between w-full mt-2 ">
                    <div>
                        <input
                            type="text"
                            value={ES}
                            onChange={handleESChange}
                            className="w-24 p-2 rounded-md bg-gray-300 outline-none  "
                            min={0}
                        />
                        <span className=" ml-[-30px] pointer-events-none ">ES</span>
                    </div>

                    <span className=" p-1 text-lg rounded-md text-center text-red-500 font-bold "> <label className="text-black font-serif ">{`This is => `}</label> {LS} LS </span>
                </div>
            </div>
        </div>
    );
};

export default ES_and_LS;
