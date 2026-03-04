"use client";
import { Bookmark } from "lucide-react";

export default function QuestionPanel({ question }) {
    const renderContent = (text) => {
        // Simple parser for dummy placeholders
        return text.split('\n').map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return null; // Remove empty line breaks entirely instead of rendering <br>

            if (trimmed.startsWith('- **')) {
                const parts = trimmed.split('**');
                return (
                    <li key={i} className="mb-1 ml-6 list-disc text-gray-700 dark:text-gray-300">
                        <strong className="font-semibold text-gray-900 dark:text-white">{parts[1]}</strong>
                        {parts[2]}
                    </li>
                );
            }

            if (trimmed.startsWith('- ')) {
                return <li key={i} className="mb-1 ml-6 list-disc text-gray-700 dark:text-gray-300">{trimmed.substring(2)}</li>;
            }

            if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                return <h3 key={i} className="font-bold mt-4 mb-1 text-base text-gray-900 dark:text-white">{trimmed.replace(/\*\*/g, '')}</h3>;
            }

            return <p key={i} className="mb-2 text-gray-700 dark:text-gray-300">{line}</p>;
        });
    };

    return (
        <div className="flex-1 relative w-1/2 md:w-[40%] border-r border-[#d8dee2] dark:border-[#2a323d] bg-[#f3f7f7] dark:bg-[#0d0d0d] overflow-y-auto p-6 md:p-8 shrink-0 transition-colors custom-scrollbar">

            {/* Background Watermark Pattern */}
            <div
                className="absolute inset-[-50%] pointer-events-none opacity-[0.04] dark:opacity-[0.05] select-none z-0 transform -rotate-[25deg] flex flex-col justify-center gap-[100px]"
                style={{ width: '200%', height: '200%' }}
            >
                {Array.from({ length: 12 }).map((_, rowIdx) => (
                    <div
                        key={rowIdx}
                        className="flex gap-16 justify-center"
                        style={{ marginLeft: rowIdx % 2 === 0 ? '0' : '-100px' }}
                    >
                        {Array.from({ length: 12 }).map((_, colIdx) => (
                            <span key={colIdx} className="text-xl font-bold text-[#797979] shrink-0 whitespace-nowrap">
                                HackerRank Confidential
                            </span>
                        ))}
                    </div>
                ))}
            </div>

            <div className="max-w-prose relative z-10 text-[14px] leading-relaxed">
                <h1 className="text-2xl font-bold mb-4 flex items-center gap-3 text-gray-900 dark:text-white">
                    <Bookmark size={24} className="text-gray-500 dark:text-gray-400" />
                    {question.title}
                </h1>

                <div className="text-gray-800 dark:text-gray-200">
                    {renderContent(question.description)}
                </div>
            </div>
        </div>
    );
}
