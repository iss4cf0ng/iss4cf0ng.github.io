console.log("custom loaded");

document.addEventListener("pjax:complete", function () {
  console.log("pjax complete triggered");
  if (window.MathJax && window.MathJax.Hub) {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }
});