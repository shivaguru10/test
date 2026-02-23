"use client";
import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import QuestionPanel from "../components/QuestionPanel";
import EditorPanel from "../components/EditorPanel";
import Footer from "../components/Footer";
import { useTest } from "../context/TestContext";

export default function Home() {
    const { hasStarted, activeQuestionId, setActiveQuestionId, questions, isRestored } = useTest();

    const activeQuestion = questions.find(q => q.id === activeQuestionId) || questions[0];

    // Prevent hydration flicker by waiting for localStorage restore
    if (!isRestored) {
        return null;
    }

    // Pre-start screen
    if (!hasStarted) {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-full bg-[#0d1117] text-white">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-8 h-8 border-4 border-[#22c55e] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-400 text-sm animate-pulse">Initializing your test environment...</p>
                </div>
            </div>
        );
    }

    // Actual Test UI
    return (
        <div className="flex flex-col h-screen w-full bg-white dark:bg-[#0f141e] text-[#39424e] dark:text-white overflow-hidden transition-colors">
            <Header />
            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar
                    questions={questions}
                    activeId={activeQuestionId}
                    onSelect={setActiveQuestionId}
                />
                <QuestionPanel question={activeQuestion} />
                <EditorPanel question={activeQuestion} />
                <Footer />
            </div>
        </div>
    );
}
