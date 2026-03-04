"use client";
import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "../context/ThemeContext";
import { useTest } from "../context/TestContext";
import { Info, Maximize2, RotateCcw, ChevronDown, ChevronUp, Play } from "lucide-react";
import Footer from "./Footer";

export default function EditorPanel({ question }) {
    const { theme } = useTheme();
    const { editorCodes, updateEditorCode } = useTest();
    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    function handleEditorBeforeMount(monaco) {
        monaco.editor.defineTheme('hr-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'keyword', foreground: '#FF636F' },          // import, class, public, static, void, int
                { token: 'type', foreground: '66d9ef' },             // Type declarations
                { token: 'type.identifier', foreground: '66d9ef' },  // Result, Solution
                { token: 'identifier', foreground: '60AFF0' },       // variable names
                { token: 'comment', foreground: '7f848e', fontStyle: 'italic' }, // comments
                { token: 'string', foreground: 'e6db74' },           // strings
                { token: 'number', foreground: '#B5CEA8' },           // numbers
                { token: 'operator', foreground: 'f92672' },         // Operators = {}[](), etc
                { token: 'delimiter', foreground: '60AFF0' }         // Brackets {}, ()
            ],
            colors: {
                'editor.background': '#0d0d0d',
                'editorLineNumber.foreground': '#4f555f',            // Dark gray line numbers
                'editorLineNumber.activeForeground': '#cdd9e5',      // Whiter for active line
                'editorIndentGuide.background': '#2a323d',
                'editor.lineHighlightBackground': '#1e242e',         // Highlight active line

                // Autocomplete Dropdown matching HackerRank (Image 2)
                'editorSuggestWidget.background': '#161b22',
                'editorSuggestWidget.border': '#2a323d',
                'editorSuggestWidget.selectedBackground': '#004b72',
                'editorHoverWidget.background': '#161b22',
                'editorHoverWidget.border': '#2a323d',
            }
        });

        // Register custom java autocomplete snippets and advanced typing support
        monaco.languages.registerCompletionItemProvider('java', {
            provideCompletionItems: (model, position) => {
                const suggestions = [
                    {
                        label: 'sout',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'System.out.println(${1});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Print a string to standard output'
                    },
                    {
                        label: 'psvm',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'public static void main(String[] args) {\n\t${1}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'main method'
                    },
                    {
                        label: 'fori',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'for (int i = 0; i < ${1:10}; i++) {\n\t${2}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'for loop'
                    },
                    {
                        label: 'foreach',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'for (${1:Type} ${2:item} : ${3:collection}) {\n\t${4}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'enhanced for loop'
                    }
                ];

                // Standard Java Keywords
                const keywords = [
                    'public', 'private', 'protected', 'static', 'final', 'void', 'int', 'double', 'boolean', 'char', 'float', 'long', 'short', 'byte',
                    'String', 'class', 'interface', 'implements', 'extends', 'return', 'if', 'else', 'switch', 'case', 'break', 'continue', 'while',
                    'do', 'try', 'catch', 'finally', 'throw', 'throws', 'new', 'this', 'super', 'null', 'true', 'false', 'import', 'package'
                ];
                keywords.forEach(kw => suggestions.push({ label: kw, kind: monaco.languages.CompletionItemKind.Keyword, insertText: kw }));

                // Standard Java Classes & Interfaces
                const classes = [
                    'System', 'out', 'Math', 'String', 'Integer', 'Double', 'Boolean', 'Character', 'Object', 'Scanner', 'Arrays', 'Collections',
                    'List', 'ArrayList', 'Map', 'HashMap', 'Set', 'HashSet', 'Queue', 'LinkedList', 'Stack', 'PriorityQueue', 'StringBuilder', 'StringBuffer'
                ];
                classes.forEach(cls => suggestions.push({ label: cls, kind: monaco.languages.CompletionItemKind.Class, insertText: cls }));

                // Common Java Methods and Attributes
                const methods = [
                    'println', 'print', 'printf', 'length', 'size', 'charAt', 'substring', 'equals', 'equalsIgnoreCase', 'compareTo', 'contains',
                    'indexOf', 'lastIndexOf', 'startsWith', 'endsWith', 'toLowerCase', 'toUpperCase', 'trim', 'split', 'replace', 'replaceAll', 'isEmpty',
                    'add', 'remove', 'get', 'set', 'put', 'keySet', 'values', 'entrySet', 'containsKey', 'containsValue', 'clear', 'clone', 'sort',
                    'binarySearch', 'copyOf', 'copyOfRange', 'fill', 'toString', 'hashCode', 'getClass', 'max', 'min', 'abs', 'pow', 'sqrt', 'round',
                    'ceil', 'floor', 'random', 'append', 'reverse'
                ];
                methods.forEach(me => suggestions.push({
                    label: me,
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: me + '()',
                    documentation: 'Common Java method or attribute'
                }));

                // Add word-based suggestions natively from the document so variables are caught
                const textUntilPosition = model.getValueInRange({
                    startLineNumber: 1, startColumn: 1,
                    endLineNumber: position.lineNumber, endColumn: position.column
                });
                const words = textUntilPosition.match(/\b\w+\b/g) || [];
                const uniqueWords = [...new Set(words)];
                uniqueWords.forEach(word => {
                    if (!keywords.includes(word) && !classes.includes(word) && !methods.includes(word)) {
                        suggestions.push({
                            label: word,
                            kind: monaco.languages.CompletionItemKind.Text,
                            insertText: word
                        });
                    }
                });

                return { suggestions: suggestions };
            }
        });
    }

    return (
        <div className="flex-[1.5] flex flex-col bg-white dark:bg-[#0d0d0d] overflow-hidden transition-colors relative">
            {/* Editor Header */}
            <div className="h-12 border-b border-gray-200 dark:border-[#2a323d] flex items-center justify-between px-4 shrink-0 bg-white dark:bg-[#0d0d0d]">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Language</span>
                    <div className="w-[180px] h-[34px] border border-gray-300 dark:border-[#555555] rounded-[8px] px-3 flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1e242e] transition-colors">
                        <span className="text-[13px] font-semibold text-gray-800 dark:text-gray-200">Java 21</span>
                        <ChevronDown size={15} className="text-gray-500" />
                    </div>
                    <Info size={16} className="text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                    <RotateCcw
                        size={16}
                        className="cursor-pointer hover:text-gray-800 dark:hover:text-white transition-colors"
                        title="Reset Code"
                        onClick={() => updateEditorCode(question.id, question.codeTemplate)}
                    />
                    <Maximize2 size={16} className="cursor-pointer hover:text-gray-800 dark:hover:text-white transition-colors" title="Fullscreen" />
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 overflow-hidden">
                <Editor
                    height="100%"
                    defaultLanguage="java"
                    theme={theme === "dark" ? "hr-dark" : "vs-light"}
                    beforeMount={handleEditorBeforeMount}
                    value={editorCodes[question.id] || question.codeTemplate}
                    onChange={(val) => updateEditorCode(question.id, val)}
                    onMount={handleEditorDidMount}
                    options={{
                        minimap: { enabled: true },
                        fontSize: 14,
                        fontFamily: "'Consolas', 'Courier New', monospace",
                        lineHeight: 21,
                        padding: { top: 16 },
                        scrollBeyondLastLine: true,
                        smoothScrolling: true,
                        cursorBlinking: "smooth",
                        cursorSmoothCaretAnimation: "on",
                        formatOnPaste: true,
                        formatOnType: true,
                        suggestOnTriggerCharacters: true,
                        acceptSuggestionOnEnter: "on",
                        quickSuggestionsDelay: 10,
                        renderLineHighlight: "all",
                        hideCursorInOverviewRuler: true,
                        overviewRulerBorder: false,
                        matchBrackets: "always",
                        autoClosingBrackets: "always",
                        autoClosingQuotes: "always",
                        autoIndent: "full",
                        folding: true,
                        showFoldingControls: "mouseover",
                        mouseWheelZoom: true,
                        multiCursorModifier: "alt",
                        snippetSuggestions: "inline",
                        scrollbar: {
                            vertical: "visible",
                            horizontal: "visible",
                            verticalScrollbarSize: 10,
                            horizontalScrollbarSize: 10,
                        },
                    }}
                />
            </div>

            {/* Editor Status Bar (above footer) */}
            <div className="h-8 border-t border-gray-200 dark:border-[#2a323d] flex items-center justify-end px-4 text-xs text-gray-500 dark:text-gray-400 gap-6 shrink-0 bg-white dark:bg-[#1a1a1a]">
                <span>Ln 24, Col 5</span>
                <span className="flex items-center gap-1.5 text-[#00ea64]"><div className="w-1.5 h-1.5 rounded-full bg-[#00ea64]"></div> Autocomplete</span>
                <span>Spaces: 4</span>
                <span>Mode: Normal</span>
            </div>

            {/* Footer / Results Bar */}
            <div className="h-[60px] border-t border-gray-200 dark:border-[#2a323d] flex items-center justify-between px-4 shrink-0 bg-white dark:bg-[#0d0d0d]">
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <ChevronUp size={16} /> Test Results
                </button>
                <div className="flex items-center gap-3">
                    <button
                        className="flex items-center justify-center bg-transparent cursor-pointer transition-all duration-200 ease hover:bg-[#22c55e] hover:bg-opacity-10"
                        style={{
                            gap: '6px',
                            padding: '4px 14px',
                            height: '32px',
                            border: '1px solid #22c55e',
                            borderRadius: '10px',
                            color: '#22c55e',
                            fontSize: '13px',
                            fontWeight: '600',
                            boxShadow: '0 0 6px #22c55e33'
                        }}
                    >
                        <Play size={13} fill="transparent" strokeWidth={2} style={{ color: '#22c55e' }} /> Run Code
                    </button>
                </div>
            </div>
        </div>
    );
}
