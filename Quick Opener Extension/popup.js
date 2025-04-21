document.getElementById("saveBtn").addEventListener("click", () => {
    const url = document.getElementById("siteUrl").value;
    if (!url) return;
  
    const parser = new URL(url);
    const favicon = `${parser.origin}/favicon.ico`;
  
    chrome.storage.sync.get("sites", ({ sites = [] }) => {
      sites.push({ url, favicon });
      chrome.storage.sync.set({ sites }, loadSites);
      document.getElementById("siteUrl").value = "";
    });
  });
  /*
  function loadSites() {
    chrome.storage.sync.get("sites", ({ sites = [] }) => {
      const list = document.getElementById("siteList");
      list.innerHTML = "";
      sites.forEach(({ url, favicon }) => {
        const li = document.createElement("li");
        li.innerHTML = `<img src="${favicon}" onerror="this.src='icon.png'"/> <a href="${url}" target="_blank">${url}</a>`;
        list.appendChild(li);
      });
    });
  }*/
  function loadSites() {
    chrome.storage.sync.get("sites", ({ sites = [] }) => {
      const list = document.getElementById("siteList");
      list.innerHTML = "";
      sites.forEach(({ url, favicon }, index) => {
        const li = document.createElement("li");
  
        li.innerHTML = `
        <img src="${favicon}" onerror="this.src='icon.png'" />
        <a href="${url}" target="_blank">${url}</a>
        
        <button class="delete-btn" data-index="${index}" title="Delete">&#10006;</button>
         
      `;
      
  
        list.appendChild(li);
      });
  
      // Add click listeners to all delete buttons
      list.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const indexToRemove = parseInt(e.target.getAttribute("data-index"));
          sites.splice(indexToRemove, 1); // Remove that one
          chrome.storage.sync.set({ sites }, loadSites); // Re-render
        });
      });
    });
  }
  
  document.addEventListener("DOMContentLoaded", loadSites);
  