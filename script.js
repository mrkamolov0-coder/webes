// 1) Sarlavhada so'zlar yozilib, o'chib turadi
var words = ["web-sayt"];
var typed = document.getElementById("typed");
var w = 0, c = 0, erasing = false;
var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function type() {
  var word = words[w];
  if (!erasing) { c++; } else { c--; }
  typed.textContent = word.slice(0, c);

  var delay = erasing ? 40 : 90;
  if (!erasing && c === word.length) { erasing = true; delay = 1400; }
  else if (erasing && c === 0) { erasing = false; w = (w + 1) % words.length; delay = 300; }
  setTimeout(type, delay);
}
if (still) { typed.textContent = words[0]; } else { type(); }

// 2) Kompyuter / Telefon tugmalari
var browser = document.getElementById("browser");
document.querySelectorAll(".sw").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".sw").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    browser.classList.toggle("phone-mode", btn.dataset.mode === "phone");
  });
});

// 3) Menyuda qaysi bo'limda turganingiz ko'rinadi
var links = document.querySelectorAll("#menu a");
var watcher = new IntersectionObserver(function (items) {
  items.forEach(function (item) {
    if (item.isIntersecting) {
      links.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + item.target.id); });
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("main section[id]").forEach(function (s) { watcher.observe(s); });

// 4) Tepaga qaytish tugmasi
var up = document.getElementById("up");
window.addEventListener("scroll", function () { up.classList.toggle("show", window.scrollY > 500); });
up.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

// 5) Forma: xabar Telegramda tayyor holda ochiladi
document.getElementById("send").addEventListener("click", function () {
  var text = "Salom! Men " + (document.getElementById("fName").value || "...") +
    ". Sayt turi: " + document.getElementById("fType").value +
    ". Vazifa: " + document.getElementById("fTask").value;
  window.open("https://t.me/javohir_km?text=" + encodeURIComponent(text), "_blank");
});

// 6) Ochiq / yopiq (Toshkent vaqti). Kunlar: 0 = yakshanba ... 6 = shanba
var hours = { 0: null, 1: [9, 19], 2: [9, 19], 3: [9, 19], 4: [9, 19], 5: [9, 19], 6: [10, 16] };
var now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tashkent" }));
var today = hours[now.getDay()];
var hour = now.getHours() + now.getMinutes() / 60;
document.getElementById("status").textContent =
  today && hour >= today[0] && hour < today[1] ? "Hozir ochiq, " + today[1] + ":00 gacha" : "Hozir yopiq";

// 7) Yil
document.getElementById("year").textContent = new Date().getFullYear();
