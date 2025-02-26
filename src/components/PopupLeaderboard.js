import React, { useState, useEffect } from "react";
import { callApi, mainUrl } from "../util/api/requestUtils";
import "../css/LeaderboardModal.css"

const LeaderboardModal = ({ isOpen, onClose }) => {
    const [leaderboard, setLeaderboard] = useState([]); // Store leaderboard data
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen) {
            fetchLeaderboard();
        }
    }, [isOpen]);

    const fetchLeaderboard = async () => {
        setIsLoading(true);
        setError(null);

        try {
            console.log("Fetching leaderboard...");

            const response = await callApi(mainUrl + "/api/lucky/top-users", "GET");
            console.log("API Response:", response); // Debug API response

            // Ensure response is an array and correctly formatted
            if (!Array.isArray(response)) {
                console.warn("Unexpected response format:", response);
                throw new Error("Leaderboard data is unavailable.");
            }

            // Transform array format to objects: [ID, "username", score, otherData]
            const validatedData = response.map((user, index) => ({
                id: user[0], // Assuming the first element is an ID
                username: typeof user[1] === "string" ? user[1] : `Player ${index + 1}`,
                score: typeof user[2] === "number" ? user[2] : 0,
                star: typeof user[3] === "number" ? user[3] : 0
            }));

            console.log("Validated Leaderboard Data:", validatedData);
            setLeaderboard(validatedData);
        } catch (err) {
            console.error("Error fetching leaderboard:", err.message);
            setError(err.message || "Failed to load leaderboard. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    if (!isOpen) return null;

    return (
        <>
            <div className="leaderboard-overlay" onClick={onClose}></div>
            <div className="leaderboard-modal">
                <div className="leaderboard-header">
                    <h2>Leaderboard</h2>
                    <button className="close-button" onClick={onClose}>✖</button>
                </div>

                {isLoading && <p>Loading leaderboard...</p>}
                {error && <p className="error-message">{error}</p>}

                {!isLoading && !error && leaderboard.length > 0 ? (
                    <div className="leaderboard-container">
                        {/* Table Header */}
                        <div className="leaderboard-header-row">
                            <span className="header-rank">#</span>
                            <span className="header-username">Username</span>
                            <span className="header-score">Total Play</span>
                            <span className="header-star">⭐ Star</span>
                        </div>

                        {/* Leaderboard List */}
                        <ul className="leaderboard-list">
                            {leaderboard.map((user, index) => (
                                <li key={user.id} className="leaderboard-item">
                                    <span className="rank">{index + 1}.</span>
                                    <span className="username">{user.username}</span>
                                    <span className="score">{user.score}</span>
                                    <span className="star">{user.star}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    !isLoading && !error && <p>No leaderboard data available.</p>
                )}
            </div>
        </>
    );
};

export default LeaderboardModal;
