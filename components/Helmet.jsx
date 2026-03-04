"use client";
import React, { useState, useEffect } from "react";
import { Wifi } from "lucide-react";

export default function Helmet() {
    const [realTime, setRealTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            let timeString = now.toLocaleTimeString('en-IN', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            timeString = timeString.replace(/\s?(AM|PM|am|pm)/i, '').trim();
            setRealTime(timeString);
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="w-full bg-[#1A1A1A] dark:bg-[#1A1A1A] flex items-center justify-end px-2 shrink-0 border-b border-gray-200 dark:border-[#2a323d] transition-colors overflow-visible"
            style={{ height: '30px' }}
        >
            <div className="flex items-center gap-4 text-[20px] font-medium">
                <Wifi size={20} className="text-white" strokeWidth={3} title="Connection Stable" />
                <span className="text-[#FFFFFF] dark:text-[#FFFFFF] leading-none">{realTime || '--:--'}</span>
            </div>
        </div>
    );
}
