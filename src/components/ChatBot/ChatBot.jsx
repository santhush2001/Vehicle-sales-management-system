import React, { useState } from "react";
import "./ChatBot.css";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ChatBot = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [question, setQuestion] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [showRecommendations, setShowRecommendations] = useState(true);

    const recommendedQuestions = [
        "What should I look for when buying a used vehicle?",
        "Is it better to buy or lease a car?",
        "How do I know if I am getting a good deal on a car?",
        "What are the key differences between gas, hybrid, and electric vehicles?",
        "What are the necessary steps for registering a new or used vehicle?",
    ];

    const toggleChat = () => {
        setIsVisible(!isVisible);
    };

    const generateAnswer = async () => {
        if (!question.trim()) return;
        setChatHistory((prev) => [...prev, { type: "question", content: question }]);
        setQuestion("");
        setShowRecommendations(false);
        setChatHistory((prev) => [...prev, { type: "answer", content: "Loading..." }]);

        try {
            const response = await axios.post(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC9FpQriKpCZbYCxw110wZ0mSS8p_4ejHQ",
                {
                    contents: [{ parts: [{ text: question }] }],
                }
            );
            const generatedText = response.data.candidates[0].content.parts[0].text;

            setChatHistory((prev) => {
                const updatedHistory = [...prev];
                updatedHistory[updatedHistory.length - 1] = { type: "answer", content: generatedText };
                return updatedHistory;
            });
        } catch (error) {
            setChatHistory((prev) => {
                const updatedHistory = [...prev];
                updatedHistory[updatedHistory.length - 1] = {
                    type: "answer",
                    content: "Error generating response. Please try again.",
                };
                return updatedHistory;
            });
        }
    };

    return (
        <>
            <div className="chat-icon" onClick={toggleChat}>
                <i className="fas fa-comments"></i>
            </div>
            {isVisible && (
                <div className="chatbot-container">
                    <div className="chatbot-header">
                        <h2>AI Assistant</h2>
                        <button onClick={toggleChat} className="close-btn">×</button>
                    </div>
                    <div className="chatbot-body">
                        {showRecommendations && chatHistory.length === 0 && (
                            <div className="recommended-questions">
                                {recommendedQuestions.map((item, index) => (
                                    <button
                                        key={index}
                                        className="recommended-question-btn"
                                        onClick={() => {
                                            setQuestion(item);
                                            setShowRecommendations(false);
                                            generateAnswer();
                                        }}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        )}
                        {chatHistory.map((entry, index) => (
                            <div
                                key={index}
                                className={`chat-bubble ${entry.type}`}
                                style={{
                                    justifyContent: entry.type === "question" ? "flex-end" : "flex-start",
                                }}
                            >
                                <div
                                    className={`chat-bubble-content ${entry.type}`}
                                    style={{
                                        backgroundColor: entry.type === "question" ? "#dcdcdc" : "#007bff",
                                        color: entry.type === "question" ? "#000" : "#fff",
                                    }}
                                >
                                    <span>{entry.content}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="chatbot-footer">
                        <textarea
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Type your question here..."
                            className="chat-input"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    generateAnswer();
                                }
                            }}
                        ></textarea>
                        <button onClick={generateAnswer} className="chat-send-btn">
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;
