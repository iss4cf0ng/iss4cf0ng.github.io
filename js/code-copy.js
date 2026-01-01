
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("pre").forEach(pre => {
    const btn = document.createElement("button");
    btn.textContent = "Copy";
    btn.style.cssText = "position:absolute;top:8px;right:8px;background:#111;color:#aaa;border:1px solid #333;cursor:pointer";
    btn.onclick = () => {
      navigator.clipboard.writeText(pre.innerText);
      btn.textContent = "Copied";
      setTimeout(()=>btn.textContent="Copy",1200);
    };
    pre.appendChild(btn);
  });
});
