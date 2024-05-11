const selectors = {
  slider : '.slider',
  slides : '.slides',
  loader: '.loader',
  prevBtn: '.prevBtn',
  nextBtn: '.nextBtn',
  p1: '.loader-p1',
  icon: '.icon',
  hamburger: '.hamburger',
  navbar: '.navbar',
  lis: '.content-li',
  sliderIcons: '#slider-icon',
  lines: '.line',
  searchIcon: '.fa-search',
  searchOverlay: '.search-overlay',
  searchbox: '.search-box'
}

// Slider
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(selectors.slider);
  const slides = document.querySelector(selectors.slides);
  const loader = document.querySelector(selectors.loader);
  let slideWidth = slider.clientWidth;
  const prevBtn = document.querySelector(selectors.prevBtn);
  const nextBtn = document.querySelector(selectors.nextBtn);
  const p1 = document.querySelector(selectors.p1);
  let currentIndex = 0;

  function goToSlide(index) {
    slides.style.transform = `translateX(-${index * slideWidth}px)`;
    currentIndex = index;
    updateButtonEventListeners();
    updateLoaderWidth();
  }

  function updateSlideWidth() {
    slideWidth = slider.clientWidth;
    goToSlide(currentIndex);
  }

  function updateButtonEventListeners() {
    if (currentIndex === 0) {
      prevBtn.removeEventListener("click", prevButtonClick);
      prevBtn.style.opacity = "0.4";
    } else {
      prevBtn.addEventListener("click", prevButtonClick);
      prevBtn.style.opacity = "1";
    }

    if (currentIndex === slides.children.length - 1) {
      nextBtn.removeEventListener("click", nextButtonClick);
      nextBtn.style.opacity = "0.4";
    } else {
      nextBtn.addEventListener("click", nextButtonClick);
      nextBtn.style.opacity = "1";
    }
  }

  function updateLoaderWidth() {
    const loaderWidth = ((currentIndex + 1) / slides.children.length) * 30;
    loader.style.width = `${loaderWidth}vw`;
    if (currentIndex === 0) {
      p1.textContent = "01";
    } else if (currentIndex === 1) {
      p1.textContent = "02";
    } else {
      p1.textContent = "03";
    }
  }

  function handleMouseWheel(event) {
    if (event.deltaY < 0 && currentIndex > 0) {
      currentIndex--;
    } else if (event.deltaY > 0 && currentIndex < slides.children.length - 1) {
      currentIndex++;
    }
    goToSlide(currentIndex);
  }

  function prevButtonClick() {
    currentIndex =
      (currentIndex - 1 + slides.children.length) % slides.children.length;
    goToSlide(currentIndex);
  }

  function nextButtonClick() {
    currentIndex = (currentIndex + 1) % slides.children.length;
    goToSlide(currentIndex);
  }

  goToSlide(currentIndex);
  prevBtn.addEventListener("click", prevButtonClick);
  nextBtn.addEventListener("click", nextButtonClick);
  window.addEventListener("resize", updateSlideWidth);
  window.addEventListener("wheel", handleMouseWheel);
});

//sun icon changes to moon
const icon = document.querySelector(selectors.icon);
icon.addEventListener("click", function (e) {
  if (e.target.classList.contains("fa-sun")) {
    e.target.classList.remove("fa-sun");
    e.target.classList.add("fa-moon");
  } else if (e.target.classList.contains("fa-moon")) {
    e.target.classList.remove("fa-moon");
    e.target.classList.add("fa-sun");
  }
});


//hamburger
const hamburger = document.querySelector(selectors.hamburger);
const navbar = document.querySelector(selectors.navbar);

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navbar.classList.toggle("active");
});

//slider list style
const lis = document.querySelectorAll(selectors.lis);
const sliderIcons = document.querySelectorAll(selectors.sliderIcons);
const lines = document.querySelectorAll(selectors.lines);

lis.forEach((li) => {
  li.addEventListener("mouseenter", function () {
    sliderIcons.forEach((icon) => (icon.style.fontSize = "20px"));
    sliderIcons.forEach((icon) => (icon.style.padding = "10px 10px"));
    lines.forEach((line) => (line.style.width = '0px'));
    lis.forEach((li) => (li.style.margin = "8px 0px 0px 20px"));
  });

  li.addEventListener("mouseleave", function () {
    sliderIcons.forEach((icon) => (icon.style.fontSize = "0px"));
    sliderIcons.forEach((icon) => (icon.style.padding = "0px"));
    lines.forEach((line) => (line.style.width = '130px'));
    lis.forEach((li) => (li.style.margin = "0px 0px 0px 0px"));
  });
});


// open search overlay
const searchIcon = document.querySelector(selectors.searchIcon);
const searchOverlay = document.querySelector(selectors.searchOverlay);
const searchbox = document.querySelector(selectors.searchbox);

searchIcon.addEventListener("click", function () {
  searchOverlay.style.height = "100vh";
  setTimeout(() => {
    searchbox.style.display = "inline-block";
  }, 250);
});

// Close search overlay when clicking outside of search box
searchOverlay.addEventListener("click", function (event) {
  if (event.target === searchOverlay) {
    setTimeout(() => {
      searchbox.style.display = "none";
    }, 250);
    searchOverlay.style.height = "0vh";
  }
});
