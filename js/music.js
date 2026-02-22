document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("music-toggle");
  const music = document.getElementById("bg-music");
  const img = document.querySelector(".music-anime");

  if (!btn || !music) return;

  btn.addEventListener("click", function () {
    if (music.paused) {
      music.play();
      btn.innerText = "⏸ Pause Music";
      if (img) img.classList.add("playing");
    } else {
      music.pause();
      btn.innerText = "▶ Play Music";
      if (img) img.classList.remove("playing");
    }
  });
});