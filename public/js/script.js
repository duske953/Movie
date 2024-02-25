import $ from "jquery";
import "slick-carousel";
import lozad from "lozad";

console.log($)
const heroContainer = document.querySelector(".hero-section__container");
const heroSectionBox = document.querySelectorAll(".hero-section__box");
const heroSection = document.querySelector(".hero-section");
const input = document.querySelector(".input");
const btnTrailer = document.querySelector(".movie-section__link-trailer");
const movieTrailerBox = document.querySelector(
  ".movie-section__trailer-container"
);
const cardImg = document.querySelectorAll(".lazy-img");
const overlay = document.querySelector(".overlay");
const trailerClosebox = document.querySelector(
  ".movie-section__trailer-close-box"
);
const menuIcon = document.querySelector(".icon-menu");
const form = document.querySelector(".nav__form");
const errBox = document.querySelector(".err-box");

document.querySelector("body").scrollIntoView();

$(heroContainer).slick({
  autoplay: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  adaptiveHeight: false,
  autoplaySpeed: 5000,
  arrows:false,
});

function gotToCarousel() {
  const slideIndex = localStorage.getItem("index");
  if (!slideIndex) return;
  $(heroContainer).slick("slickGoTo", slideIndex, true);
}

gotToCarousel();

function setBackgroundImg() {
  let slideIndex = $(heroContainer).slick("slickCurrentSlide");
  const posterPath = heroSectionBox[slideIndex]
    .querySelector(".hero-section__img-box")
    .firstElementChild.getAttribute("data-poster");
  heroSection.style.background = `linear-gradient(to left, rgb(52, 58, 64), rgba(33, 37, 41, 0.644)),url(${posterPath})`;
  return slideIndex;
}

if (heroContainer && heroSectionBox) {
  setBackgroundImg();
}

$(heroContainer).on("afterChange", () => {
  const slideIndex = setBackgroundImg();
  localStorage.setItem("index", slideIndex);
});

if (btnTrailer) {
  btnTrailer.addEventListener("click", () => {

    movieTrailerBox.classList.add("movie-section__trailer-container--active");
    overlay.classList.add("overlay--active");
  });
}

if (overlay) {
  overlay.addEventListener("click", () => {
    movieTrailerBox.classList.remove(
      "movie-section__trailer-container--active"
    );
    overlay.classList.remove("overlay--active");
  });
}

if (trailerClosebox) {
  trailerClosebox.addEventListener("click", () => {
    movieTrailerBox.classList.remove(
      "movie-section__trailer-container--active"
    );
    movieTrailerBox.querySelector("iframe").
    setAttribute("src",movieTrailerBox.querySelector("iframe").getAttribute("src"))
    overlay.classList.remove("overlay--active");
  });
}

if (menuIcon) {
  menuIcon.addEventListener("click", () => {
    form.classList.toggle("nav__form--active");
  });
}
setTimeout(() => {
  const observer = lozad(cardImg); // lazy loads elements with default selector as '.lozad'
  observer.observe();
}, 50);
