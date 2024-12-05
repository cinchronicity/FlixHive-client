import React from "react";
import "./glowing-hexagon.scss";

export const GlowingHexagon = () => {
  return (
    <div className="glow-hexagon-container">
      <div className="hexagon-grid">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="hexagon">
            <div className="hexagon-inner"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
