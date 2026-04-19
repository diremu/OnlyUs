/* ── Cursor ── */
const cursor = document.getElementById("cursor");
const cursorMainLogo = document.getElementById("cusorMain");
document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});
document
    .querySelectorAll("a, button, .navbar-drop-pill")
    .forEach((el) => {
        el.addEventListener(
            "mouseenter",
            () => cursor.classList.add("expand"),
            (cursorMainLogo.style.opacity = 0),
        );
        el.addEventListener(
            "mouseleave",
            () => cursor.classList.remove("expand"),
            (cursorMainLogo.style.opacity = 1),
        );
    });

/* ── Menu toggle ── */
const overlay = document.getElementById("menuOverlay");
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("menuClose");

function openMenu() {
    overlay.classList.add("open");
    menuBtn.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeMenu() {
    overlay.classList.remove("open");
    menuBtn.classList.remove("open");
    document.body.style.overflow = "";
}

menuBtn.addEventListener("click", () =>
    overlay.classList.contains("open") ? closeMenu() : openMenu(),
);
closeBtn.addEventListener("click", closeMenu);
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
});

/* ── Video → placeholder swap ── */
const heroVideo = document.getElementById("heroVideo");
const heroPlaceholder = document.getElementById("heroPlaceholder");

function revealVideo() {
    heroVideo.classList.add("visible");
    heroPlaceholder.classList.add("hidden");
}

if (heroVideo.src && heroVideo.src !== window.location.href) {
    heroVideo.addEventListener("canplaythrough", revealVideo, {
        once: true,
    });
    // Fallback: if video stalls for any reason, remove placeholder after 8s
    setTimeout(() => {
        if (!heroPlaceholder.classList.contains("hidden")) revealVideo();
    }, 5000);
}

/* ── Fullscreen / cinematic mode ── */
const fullscreenBtn = document.getElementById("fullscreenBtn");
let isCinematic = false;

function enterCinematic() {
    isCinematic = true;
    closeMenu(); // dismiss menu if open
    document.body.classList.add("cinematic");
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
    }
}

function exitCinematic() {
    isCinematic = false;
    document.body.classList.remove("cinematic");
    if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen();
    }
}

fullscreenBtn.addEventListener("click", () => {
    isCinematic ? exitCinematic() : enterCinematic();
});

// Click anywhere on video area to exit cinematic
document.querySelector(".hero").addEventListener("click", () => {
    if (isCinematic) exitCinematic();
});

// Esc key exits cinematic (browser also fires fullscreenchange on Esc)
document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && isCinematic) exitCinematic();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isCinematic) exitCinematic();
});

//Menu Animtions
let newdropMenuLink = document.getElementById("new-drop-nav-link");
let aboutMenuDrop = document.getElementById("aboutUs-link");
let shopMenuLink = document.getElementById("shop-link");
const menuOverlay = document.getElementById("menuOverlay");
const fullscreenButton = document.getElementById("fullscreenBtn");
let old = menuOverlay.style.background;
const imagePath = "images/Screenshot (370).png";

newdropMenuLink.addEventListener("mouseover", () => {
    document.body.classList.add("cinematic");
    fullscreenButton.style.display = "none";
});
newdropMenuLink.addEventListener("mouseout", () => {
    document.body.classList.remove("cinematic");
    fullscreenButton.style.display = "block";
});
aboutMenuDrop.addEventListener("mouseover", () => {
    menuOverlay.classList.add("aboutUs");
});

aboutMenuDrop.addEventListener("mouseout", () => {
    menuOverlay.classList.remove("aboutUs");
});
/* ── Shop preview: infinite scrolling columns ── */
const shopPreview = document.getElementById('shopPreview');
const shopDivider = document.getElementById('shopDivider');
const shopColsWrap = document.getElementById('shopColumns');
const menuNavWrap = document.querySelector('.menu-nav-wrap');

// Store items — swap src values for real product images
const shopItems = [
    { src: 'images/Brand Demo/BLACK_LEAGUE_POLO_FRONT.jpg', name: 'League Polo' },
    { src: 'images/Brand Demo/bolapsd_belt_5f837ca2-5f59-429c-9d03-e48d757672d3.jpg', name: 'Bola Belt' },
    { src: 'images/Brand Demo/bolapsd_black_skullcap_ecommerce_front_flat.jpg', name: 'Black Skullcap' },
    { src: 'images/Brand Demo/bolapsd_burgundy_skullcap_ecommerce_front_flat.jpg', name: 'Burgundy Skullcap' },
    { src: 'images/Brand Demo/bolapsd_coffee_skullcap_ecommerce_front_flat.jpg', name: 'Coffee Skullcap' },
    { src: 'images/Brand Demo/BOLAPSD_Emberline_2-Piece_Set_FRONT.jpg', name: 'Emberline 2-piece' },
    { src: 'images/Brand Demo/BOLAPSD_EMBERLINE_DRESS.jpg', name: 'Emberline Dress' },
    { src: 'images/Brand Demo/BOLAPSD_Emberline_Romper_FRONT.jpg', name: 'Emberline Romper' },
    { src: 'images/Brand Demo/BOLAPSD_Emberline_Romper_RED_FRONT.jpg', name: 'Emberline Romper Red' },
    { src: 'images/Brand Demo/bolapsd_grey_skullcap_ecommerce_front_flat.jpg', name: 'Grey Skullcap' },
    { src: 'images/Brand Demo/bolapsd_polo_ecommerce_blue_flat.jpg', name: 'Blue Polo' },
    { src: 'images/Brand Demo/bolapsd_red_skullcap_ecommerce_front_flat.jpg', name: 'Red Skullcap' },
];

const colDefs = [
    { cls: 'shop-col shop-col-1', items: [0, 3, 6, 9], heights: ['sh-lg', 'sh-md', 'sh-xl', 'sh-sm'] },
    { cls: 'shop-col shop-col-2', items: [1, 4, 7, 10], heights: ['sh-md', 'sh-xl', 'sh-sm', 'sh-lg'] },
    { cls: 'shop-col shop-col-3', items: [2, 5, 8, 11], heights: ['sh-xl', 'sh-sm', 'sh-lg', 'sh-md'] },
];

function makeCard(item, heightCls) {
    const div = document.createElement('div');
    div.className = 'shop-card ' + heightCls;
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.name;
    img.loading = 'lazy';
    const tag = document.createElement('div');
    tag.className = 'shop-card-tag';
    tag.textContent = item.name;
    div.append(img, tag);
    return div;
}

colDefs.forEach(({ cls, items, heights }) => {
    const col = document.createElement('div');
    col.className = cls;
    // Two copies for seamless loop
    [0, 1].forEach(() => {
        items.forEach((idx, i) => {
            col.appendChild(makeCard(shopItems[idx], heights[i]));
        });
    });
    shopColsWrap.appendChild(col);
});

function showShopPreview() {
    shopPreview.classList.add('visible');
    shopDivider.classList.add('visible');

}

function hideShopPreview() {
    shopPreview.classList.remove('visible');
    shopDivider.classList.remove('visible');

}

shopMenuLink.addEventListener('mouseover', showShopPreview);
shopMenuLink.addEventListener('mouseout', (e) => {
    // Keep preview open if cursor moves into the preview panel
    if (!shopPreview.contains(e.relatedTarget)) hideShopPreview();
});
shopPreview.addEventListener('mouseout', (e) => {
    if (!shopPreview.contains(e.relatedTarget) && e.relatedTarget !== shopMenuLink) hideShopPreview();
});