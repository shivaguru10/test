"use client";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useTest } from "../context/TestContext";
import { Layout, Sun, Moon, HelpCircle, Clock, Wifi } from "lucide-react";

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    const { timeLeft } = useTest();

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
            // Remove AM/PM and trim any extra spaces
            timeString = timeString.replace(/\s?(AM|PM|am|pm)/i, '').trim();
            setRealTime(timeString);
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // Add leading zero if seconds < 10 (e.g., 09)
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return (
        <header className="flex items-center justify-between pl-4 pr-2 min-h-[60px] bg-white dark:bg-[#0d0d0d] border-b border-hr-border shrink-0 py-2">
            {/* Timer / Left Area */}
            <div
                className="flex items-center gap-1.5 cursor-pointer"
                style={{
                    backgroundColor: '#033a15',          // darker green
                    borderRadius: '20px',                // pill shape
                    padding: '2px 8px',                  // slight increase horizontally
                    fontSize: '11px',                    // smaller text
                    color: '#62ff7d',                    // softer green text
                    boxShadow: '0 0 6px rgba(0, 255, 0, 0.25)' // subtle glow
                }}
            >
                <Clock size={11} strokeWidth={2.3} color="#62ff7d" />
                <span>{minutes} min {formattedSeconds} sec</span>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 text-hr-text-dimmed">
                <button className="flex items-center gap-2 hover:text-hr-text transition-colors" title="Layout">
                    <span className="text-sm">Layout</span>
                    <Layout size={18} />
                </button>

                <button onClick={toggleTheme} className="hover:text-hr-text transition-colors" title="Toggle Theme">
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <button className="hover:text-hr-text transition-colors" title="Help">
                    <HelpCircle size={18} />
                </button>

                <div className="flex flex-col items-end gap-1.5 ml-2">
                    {/* <div className="flex items-center gap-2 text-[13px] font-medium tracking-wide">
                        <Wifi size={16} className="text-green-500" strokeWidth={2.5} title="Connection Stable" />
                        <span className="text-hr-text-dimmed">{realTime || '--:--'}</span>
                    </div> */}
                    <button className="bg-[var(--hr-text)] text-[var(--hr-bg)] border-none px-4 py-1.5 rounded text-sm font-semibold hover:opacity-90 transition-opacity">
                        Save & Proceed
                    </button>
                </div>
            </div>
        </header>
    );
}
