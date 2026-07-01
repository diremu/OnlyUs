import React, { useState, useEffect } from "react";
import { shopItems, colDefs } from "../data/catalogue";
import ShopCard from "./ShopCard";

const Menu = ({ isOpen, onClose }) => {
  const [isShopVisible, setIsShopVisible] = useState(false);
  const [isCinematic, setIsCinematic] = useState(false);
  const [isAboutUsActive, setIsAboutUsActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (isCinematic) {
      document.body.classList.add("cinematic");
      const fsBtn = document.getElementById("fullscreenBtn");
      if (fsBtn) fsBtn.style.display = "none";
    } else {
      document.body.classList.remove("cinematic");
      const fsBtn = document.getElementById("fullscreenBtn");
      if (fsBtn) fsBtn.style.display = "block";
    }
  }, [isCinematic]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const handleShopMouseOut = (e) => {
    const relatedTarget = e.relatedTarget;
    const previewEl = document.getElementById("shopPreview");
    const linkEl = document.getElementById("shop-link");

    if (previewEl?.contains(relatedTarget) || relatedTarget === linkEl) {
      return;
    }
    setIsShopVisible(false);
  };

  return (
    <div
      className={`menu-overlay ${isOpen ? "open" : ""} ${isAboutUsActive ? "aboutUs" : ""}`}
      id="menuOverlay"
      role="dialog"
      aria-label="Navigation menu"
    >
      <div className="menu-topbar">
        <div className="menu-brand">
          <span className="menu-brand-wordmark">Only us</span>
        </div>
        <button
          className="menu-close-btn"
          aria-label="Close menu"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <div className="menu-body">
        <div className={`shop-divider ${isShopVisible ? "visible" : ""}`}></div>

        <div
          className={`shop-preview ${isShopVisible ? "visible" : ""}`}
          id="shopPreview"
          onMouseOut={handleShopMouseOut}
        >
          <p className="shop-preview-label">Now in store</p>
          <div className="shop-columns">
            {colDefs.map(({ cls, items, heights }, colIdx) => (
              <div key={colIdx} className={cls}>
                {[0, 1].map((loopIdx) => (
                  <React.Fragment key={loopIdx}>
                    {items.map((itemIdx, i) => (
                      <ShopCard
                        key={`${loopIdx}-${itemIdx}`}
                        item={shopItems[itemIdx]}
                        heightCls={heights[i]}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="menu-nav-wrap">
          <ul className="menu-nav">
            <li>
              <a href="#">Home</a>
            </li>

            <li>
              <a href="#">New Drop</a>
            </li>

            <li>
              <a
                href="/about"
                onMouseEnter={() => setIsAboutUsActive(true)}
                onMouseLeave={() => setIsAboutUsActive(false)}
              >
                About Us
              </a>
            </li>

            <li>
              <a
                id="shop-link"
                href="#"
                onMouseOver={() => setIsShopVisible(true)}
                onMouseOut={handleShopMouseOut}
              >
                Shop
              </a>
            </li>

            <li>
              <a href="#">My Bag</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="menu-footer">
        <a href="#">Instagram</a>
        <a href="#">TikTok</a>
        <a href="#">Snapchat</a>
        <a href="#">Contact</a>
      </div>
    </div>
  );
};

export default Menu;
