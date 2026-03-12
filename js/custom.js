console.log("custom loaded");

function loadUtterances() {
  const commentsContainer = document.getElementById('utterances-container');

  if (commentsContainer && !commentsContainer.hasChildNodes()) {
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'iss4cf0ng/iss4cf0ng.github.io');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', 'github-dark');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;
    commentsContainer.appendChild(script);
    console.log("Utterances loaded");
  }
}

document.addEventListener("DOMContentLoaded", loadUtterances);

document.addEventListener("pjax:complete", function () {
  console.log("pjax complete triggered");
  
  if (window.MathJax && window.MathJax.Hub) {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }

  loadUtterances();
});