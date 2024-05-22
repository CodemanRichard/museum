import React from "react";
import "./Title.css";

const museums = [
  "the V&A",
  "澳大利亚国家博物馆",
  "北京故宫博物院（故宫专题）",
  "京都国立博物馆",
  "正仓院",
  "大都会艺术博物馆",
  "卢浮宫博物馆",
  "台北故宫博物馆",
];

const logo_size = 70; // 70是比较合适的高度

function Title({museumName}) {
  return (
    <div className="u-flex">
      {museums.map((museum, index) => (
        <img
          src={require("./museum_logos/" + museum + ".png")}
          alt="logo"
          height={logo_size}
          className={`logo ${museumName === museum ? "highlight" : ""}`}
        />
      ))}
    </div>
  );
}

export default Title;
