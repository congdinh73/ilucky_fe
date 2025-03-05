import "./App.css";

import "./css/typo/typo.css";
import "./css/hc-canvas-luckwheel.css";
import hcLuckywheel from "./js/hc-canvas-luckwheel";
import { useEffect, useState, useRef } from "react";
import gui from "./util/gui";
import Background from "./images/free/bg1.png";
import Vongquay from "./images/free/Vongquay.png";
import HieuUngSao from "./images/free/HieuUngSao.png";
import IconKimQuay from "./images/icon/IconKimQuay.svg";
import IconLoa from "./images/icon/IconLoa.svg";
import IconLoaTat from "./images/icon/IconLoaTat.svg";
import bangdon from "./images/icon/bangdon.svg";
import Congratulation from "./images/icon/Congratulation.svg";
import LuckyRoulette from "./images/icon/LuckyRoulette.svg";

import IconVuongMieng from "./images/svg/IconVuongMieng.svg";
import IconTui from "./images/svg/IconTui.svg";
import IconSach from "./images/svg/IconSach.svg";
import logout from "./images/svg/logout.svg";
import { callApi, mainUrl } from "./util/api/requestUtils";
import React from "react";
import Icon1 from "./images/svgquatang/icon1.svg";
import IconSamsung from "./images/quatang/SS.svg";
import Gift from "./images/quatang/GIFT.svg";
import IconLetter from "./images/quatang/LETTER.svg";
import IconStars from "./images/quatang/STARS.svg";
import IconFBU from "./images/quatang/FBU.svg";
import mp3Main from "./mp3/lucky_spin.mp3";
import mp3Done from "./mp3/lucky_done.mp3";
import PopupQua from "./components/PopupQua";
import PopupHistory from "./components/PopupHistory";
import LeaderboardModal from "./components/PopupLeaderboard";
import PopupHuongDan from "./components/PopupHuongDan";
import PopupBuyTurn from "./components/PopupBuyTurn";
import { useTranslation } from "react-i18next";
import "./util/i18n";

const Modal = ({ isOpen, onClose, onLogin, onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    if (!isOpen) return null;

    return (
        <div className="modal" style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(15px) saturate(150%)",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "20px"
        }}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>×</span>
                <h2 style={{
                    textAlign: "center",
                    fontSize: "26px",
                    fontWeight: "bold",
                    color: "#007bff",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    marginBottom: "20px"
                }}>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                        borderRadius: "5px",
                        border: "1px solid #ddd"
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                        borderRadius: "5px",
                        border: "1px solid #ddd"
                    }}
                />
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <button
                        style={{
                            background: "linear-gradient(135deg, #007bff, #0056b3)",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "bold",
                            padding: "12px 24px",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            boxShadow: "0 4px 10px rgba(0, 123, 255, 0.3)",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => (e.target.style.boxShadow = "0 6px 12px rgba(0, 123, 255, 0.5)")}
                        onMouseLeave={(e) => (e.target.style.boxShadow = "0 4px 10px rgba(0, 123, 255, 0.3)")}
                        onClick={() => onLogin(username, password)}
                    >Login</button>
                    <button
                        style={{
                            background: "linear-gradient(135deg, #28a745, #1e7e34)",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "bold",
                            padding: "12px 24px",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            boxShadow: "0 4px 10px rgba(40, 167, 69, 0.3)",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => (e.target.style.boxShadow = "0 6px 12px rgba(40, 167, 69, 0.5)")}
                        onMouseLeave={(e) => (e.target.style.boxShadow = "0 4px 10px rgba(40, 167, 69, 0.3)")}
                        onClick={() => onRegister(username, password)}
                    >Register</button>
                </div>
            </div>
        </div>
    );
};

export const prizes = [
    {
        text: "Share",
        img: Icon1,
        giftCode: ["SHARE"],
        lucky: 0,
        label: "Share",
    },
    {
        text: "VND",
        img: IconFBU,
        giftCode: ["200VND", "500VND", "1000VND", "10000VND"],
        lucky: 1,
        label: "10000 VND",
    },
    {
        text: "GoodLuck",
        img: Gift,
        giftCode: ["UNLUCKY"],
        lucky: 2,
        label: "Chúc bạn may mắn lần sau",
    },
    {
        text: "Letter",
        img: IconLetter,
        giftCode: ["L", "U", "M", "I", "T", "E", "L1"],
        lucky: 3,
        label: "Letter",
    },
    {
        text: "Galaxy S23",
        img: IconSamsung,
        giftCode: ["SAMSUNG1", "SAMSUNG2", "SAMSUNG3", "SAMSUNG4"],
        lucky: 4,
    },
    {
        text: "Stars",
        img: IconStars,
        giftCode: ["5STARS", "55STARS", "555STARS", "5555STARS"],
        lucky: 5,
        label: "5555 Stars",
    },
];

const convertStringToArray = (str) => {
    let converPath = str
        .split(/[&]+/)
        .map((i) => i.trim())
        .map((i) => ({
            type: i.split(/[=]+/)[0],
            value: i.split(/[=]+/)[1],
        }));
    return converPath;
};

const App = () => {
    const paramsArray = window.location.search
        ? convertStringToArray(
            window.location.search.slice(1, window.location.search.length)
        )
        : [];

    const languageUrl = paramsArray.find((o) => o.type === "lang")?.value || "VI";
    const [tokenLocal, setTokenLocal] = useState(localStorage.getItem("token") || "");

    const [tokenState, setTokenState] = useState(tokenLocal);

    const [isMute, setIsMute] = useState(false);
    const [showQua, setShowQua] = useState(false);
    const [ItemTrungThuong, setItemTrungThuong] = useState("");
    const [showHistory, setShowHistory] = useState(false);
    const [showHuongDan, setShowHuongDan] = useState(false);
    const [countPlayTurn, setCountPlayTurn] = useState(0);
    const [buyMore, setBuyMore] = useState(false);
    const [messageError, setMessageError] = useState("");
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    const { t, i18n } = useTranslation();
    const audioRef = useRef(null);
    const audioDoneRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (tokenLocal) {
            setTokenState(tokenLocal);
            wsGetLuckyPlayTurn();
        }
    }, [tokenLocal]);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(mp3Main);
        }
        if (!audioDoneRef.current) {
            audioDoneRef.current = new Audio(mp3Done);
        }
        audioRef.current.muted = isMute;
        audioDoneRef.current.muted = isMute;
    }, [isMute]);

    useEffect(() => {
        i18n.changeLanguage(languageUrl || "VI");
    }, [languageUrl]);

    useEffect(() => {
        if (tokenState) {
            fetchData();
        }
    }, [tokenState]);

    const wsGetLuckyPlayTurn = async () => {
        try {
            const url = mainUrl + "/api/user/info";
            const res = await callApi(url, "POST", {});
            const { totalPlay } = res;
            if (res) {
                setCountPlayTurn(totalPlay || 0);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    const fetchData = () => {
        hcLuckywheel.init({
            id: "luckywheel",
            config: function (callback) {
                callback && callback(prizes);
            },
            mode: "both",
            getPrize: async function (callback) {
                audioRef.current.play();
                try {
                    const url = mainUrl + "/api/lucky/play"
                    const res = await callApi(url, "POST", {});
                    const { gift } = res;
                    const found = gift.id && prizes.find((o) => o.giftCode.find((k) => k === gift.id));
                    setItemTrungThuong({ ...res, ...found, code: gift.id });
                    if (found) {
                        callback && callback([found?.lucky || 0, found?.lucky || 0]);
                    } else if (res?.totalPlay === 0) {
                        alert("Hết lượt quay");
                    }
                } catch (error) {
                    console.log("error", error);
                }
            },
            gotBack: function (data) {
                audioRef.current.pause();
                audioDoneRef.current.play();
                audioRef.current.currentTime = 0;
                setShowQua(true);
                wsGetLuckyPlayTurn();
            },
        });
    };

    const callbackOk = async () => {
        setShowQua(false);
        audioDoneRef.current.pause();
        audioRef.current.currentTime = 0;
    };

    const onLogout = () => {
        localStorage.setItem("token", "");
        setTokenLocal("");
        window.location.reload();
    };

    const handleRegister = async (username, password) => {
        if (!username.trim() || !password.trim()) {
            alert("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!");
            return;
        }

        try {
            const response = await fetch(mainUrl + "/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.message.includes("already exists")) {
                    alert("Username already exists.");
                } else {
                    alert(data.message);
                }
                return;
            }

            alert("Register successfully.");
        } catch (error) {
            console.error("Register error:", error);
            alert("Error while register.");
        }
    };

    const handleLogin = async (username, password) => {
        try {
            const response = await fetch(mainUrl + '/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Login failed:", data.message);
                alert(data.message);
                return;
            }

            const tokenValue = data.accessToken;

            if (tokenValue) {
                localStorage.setItem("token", tokenValue);
                setTokenLocal(tokenValue);
                setIsModalOpen(false);
            } else {
                console.error("Login failed: Invalid token response", data);
                alert("Login failed. The server did not return a token.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An unexpected error occurred during login.");
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const LoginButtonStyle = {
        marginTop: 10,
        fontSize: 12,
        color: "#FFF",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    return (
        <div
            style={{
                backgroundColor: "#333",
                width: gui.screenWidth,
                height: gui.screenHeight,
                minHeight: 896,
                overflow: "hidden",
                display: "flex",
                position: "relative",
                alignItems: "center",
                flexDirection: "column",
                backgroundImage: `url(${Background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
            <img
                onClick={() => setIsMute((v) => !v)}
                style={{ position: "absolute", right: 80, top: 60, cursor: "pointer", zIndex: 2 }}
                src={!isMute ? IconLoa : IconLoaTat}
            />
            <div
                style={{
                    display: "flex",
                    zIndex: 1,
                    position: "absolute",
                    top: 92,
                    width: gui.screenWidth,
                    justifyContent: "center",
                    alignItems: "center",
                    left: 0,
                    height: "auto",
                    flexDirection: "column",
                }}
            >
                <div style={{ zIndex: 10, position: "relative", height: 105 }}>
                    <img src={bangdon} alt="" />
                    <img
                        style={{ position: "absolute", zIndex: 12, left: 110, top: 25 }}
                        src={showQua ? Congratulation : LuckyRoulette}
                        alt=""
                    />
                </div>
                <img style={{ marginTop: -55, zIndex: 11, width: 390, height: 390 }} src={Vongquay} alt="" />
                <img style={{ position: "absolute", top: -100, zIndex: 1 }} src={HieuUngSao} alt="" />
            </div>
            <section id="luckywheel" className="hc-luckywheel">
                <div className="hc-luckywheel-container">
                    <canvas className="hc-luckywheel-canvas" width="500px" height="500px">
                        Vòng Xoay May Mắn
                    </canvas>
                </div>
                <img
                    style={{ position: "absolute", top: 131, left: 134, zIndex: 99 }}
                    src={IconKimQuay}
                    alt=""
                />
                <div className="hc-luckywheel-btn">{t("Spin")}</div>
                <div
                    style={{
                        position: "absolute",
                        color: "#FFF",
                        width: 210,
                        left: 52,
                        zIndex: 99,
                        bottom: -160,
                        fontSize: 14,
                        fontWeight: "bold",
                        textAlign: "center"
                    }}
                >
                    {t("you have")} {t("turns")} {countPlayTurn}
                </div>
            </section>
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    zIndex: 98,
                }}
            >
                <div
                    className="ct-flex-row"
                    style={{
                        marginBottom: 12,
                        justifyContent: "space-between",
                        paddingLeft: 16,
                        paddingRight: 16,
                    }}
                >
                    <div className="ct-flex-col">
                        <ItemOption
                            icon={IconSach}
                            onClick={() => setShowHistory(true)}
                            text={t("History")}
                        />
                        <ItemOption onClick={() => setBuyMore(true)} icon={IconTui} text={t("Buy more turn")} />
                    </div>
                    <div className="ct-flex-col">
                        <ItemOption onClick={() => setShowHuongDan(true)} icon={IconVuongMieng} text={t("Gift")} />
                        <ItemOption
                            onClick={() => setShowLeaderboard(true)}
                            icon={IconVuongMieng}
                            text={t("Leaderboard")}
                        />
                        {tokenLocal ? (
                            <ItemOption onClick={onLogout} text={t("Logout")} icon={logout} />
                        ) : (
                            <div style={LoginButtonStyle} onClick={openModal}>
                                <img src={logout} alt="Login" style={{ marginRight: '5px' }} />
                                Login
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} onLogin={handleLogin} onRegister={handleRegister} />

            {showQua ? <PopupQua token={tokenState} languageUrl={languageUrl} data={ItemTrungThuong} callback={callbackOk} /> : null}
            {buyMore ? (
                <PopupBuyTurn
                    onClose={() => setBuyMore(false)}
                    onSuccess={(updatedTurns) => {
                        setBuyMore(false);
                        if (updatedTurns) {
                            setCountPlayTurn(updatedTurns);
                            setMessageError(`Bạn đã mua thêm lượt thành công. Số lượt còn lại: ${updatedTurns}`);
                        } else {
                            setMessageError("Có lỗi xảy ra khi cập nhật lượt.");
                        }
                    }}
                />
            ) : null}

            {showHistory ? <PopupHistory onClose={() => setShowHistory(false)} /> : null}
            {showHuongDan ? <PopupHuongDan onClose={() => setShowHuongDan(false)} /> : null}
            <LeaderboardModal isOpen={showLeaderboard} onClose={() => setShowLeaderboard(false)} />
        </div>
    );
};

const ItemOption = ({ icon, text, onClick }) => {
    return (
        <div
            className="ct-flex-col"
            style={{
                marginTop: 10,
                marginBottom: text ? 0 : 14,
                fontSize: 12,
                color: "#FFF",
                cursor: "pointer",
            }}
            onClick={onClick}
        >
            <img style={{}} src={icon} alt={text} />
            {text ? text : ""}
        </div>
    );
};

export default App;