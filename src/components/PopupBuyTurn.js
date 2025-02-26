/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import PopupOTP from "../images/svgPopup/PopupCancel.svg";
import IconX from "../images/svgPopup/IconX.svg";

import "./styles.css";
import { callApi, mainUrl } from "../util/api/requestUtils";
import { useTranslation } from "react-i18next";
import gui from "../util/gui";

const PopupBuyTurn = ({ onClose, onSuccess }) => {
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState(""); // Thêm state để hiển thị thông báo

  const onSubmit = async () => {
    setDisabled(true);
    setMessage(""); // Reset message before API call
  
    try {
      const url = mainUrl + `/api/lucky/buy_turns?turns=5&costPerTurn=1000&currencyType=VND`;
      const token = localStorage.getItem("token");
  
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const res = await fetch(url, options);
  
      let data;
      try {
        data = await res.json();
      } catch (jsonError) {
        throw new Error("Invalid JSON response or empty response.");
      }
  
      console.log("res", data);
  
      if (res.ok) {
        const newTurnCount = data?.message?.match(/\d+/)?.[0] || "unknown"; 
        onSuccess(newTurnCount); // Pass updated turn count
        setMessage(t(`Mua lượt quay thành công! Bạn còn ${newTurnCount} lượt.`));
      } else {
        setMessage(data?.message || t("Lỗi khi mua lượt quay."));
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(t("Lỗi hệ thống. Vui lòng thử lại."));
    } finally {
      setDisabled(false);
    }
  };

  return (
    <>
      <div className="main-history ct-flex-col">
        <div
          style={{
            position: "relative",
            width: 330,
            height: gui.screenHeight,
            marginTop: 80,
          }}
        >
          <div
            onClick={onClose}
            style={{
              position: "absolute",
              zIndex: 10000,
              top: 10,
              right: -16,
              cursor: "pointer",
            }}
          >
            <img className="" src={IconX} />
          </div>
          <div
            className="title-popup"
            style={{
              position: "absolute",
              left: 120,
              top: 7,
              color: "#4C2626",
              fontSize: 14,
              width: "100px",
              textAlign: "center",
            }}
          >
            Gura
          </div>
          <div
            style={{
              position: "absolute",
              height: 130,
              width: "88%",
              top: 24,
              left: 8,
              padding: "24px 16px 0 16px",
              justifyContent: "center",
            }}
            className="ct-flex-col"
          >
            <div
              style={{
                width: 118,
                height: 33,
                border: "1px solid #B46C6C",
                backgroundColor: "#FFF",
                borderRadius: 50,
                justifyContent: "center",
                color: "#000",
              }}
              className="ct-flex-row"
            >
              5
            </div>
            <div style={{ fontSize: 12, marginTop: 6 }}>
              {t("5000 VND/5 turns/day")}
            </div>

            {/* Hiển thị thông báo lỗi nếu có */}
            {message && (
              <div
                style={{
                  color: "red",
                  fontSize: 12,
                  marginTop: 6,
                  textAlign: "center",
                }}
              >
                {message}
              </div>
            )}

            <button
              style={{ marginTop: 8 }}
              onClick={onSubmit}
              className="button-ok"
              disabled={disabled}
            >
              {t("Buy")}
            </button>
          </div>
          <img className="" style={{}} src={PopupOTP} />
        </div>
      </div>
    </>
  );
};

export default PopupBuyTurn;
