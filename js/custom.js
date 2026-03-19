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

let mermaidLoaded = false;

async function loadMermaid() {
  if (mermaidLoaded) return;

  try {
    const mermaid = await import('https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs');

    mermaid.default.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'dark',
      htmlLabels: true,
    });

    window.mermaid = mermaid.default;
    mermaidLoaded = true;
    window.dispatchEvent(new Event('mermaid:ready'));
    console.log("Mermaid loaded");
  } catch (err) {
    console.error("Failed to load Mermaid:", err);
  }
}

async function renderMermaid() {
  if (!window.mermaid) return;

  const elements = Array.from(document.querySelectorAll('.mermaid'))
    .filter(el => el.getAttribute('data-rendered') !== 'true');

  if (elements.length === 0) return;

  elements.forEach(el => {
    let src = el.getAttribute('data-source');
    if (!src) {
      src = el.textContent.trim();
      el.setAttribute('data-source', src);
    }
    el.textContent = src;
  });

  try {
    await window.mermaid.run({ nodes: elements });

    elements.forEach(el => {
      el.setAttribute('data-rendered', 'true');
      const svgEl = el.querySelector('svg');
      if (svgEl) {
        svgEl.removeAttribute('width');
        svgEl.removeAttribute('height');
        svgEl.style.width = '100%';
        svgEl.style.height = 'auto';

        svgEl.querySelectorAll('g.clickable').forEach(node => {
          node.style.cursor = 'pointer';

          const rect = node.querySelector('rect');
          if (rect) {
            rect.style.stroke = '#58a6ff';
            rect.style.strokeWidth = '2px';
          }

          node.querySelectorAll('span, p').forEach(span => {
            span.style.color = '#58a6ff';
            span.style.textDecoration = 'underline';
          });

          const a = node.closest('a') || node.querySelector('a');
          if (a) {
            const href = a.getAttribute('href') || a.getAttribute('xlink:href');
            if (href) {
              a.style.cursor = 'pointer';
              a.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = href;
              });
            }
          }
        });
      }
    });

    console.log("Mermaid rendered");
  } catch (err) {
    console.error("Mermaid run error:", err);
  }
}

async function initPage() {
  await loadMermaid();
  await renderMermaid();
  loadUtterances();

  if (window.MathJax && window.MathJax.Hub) {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initPage();
});

document.addEventListener("pjax:complete", function () {
  console.log("pjax complete triggered");
  initPage();
});