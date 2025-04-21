document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("yes").addEventListener("click", () => {
      chrome.storage.sync.get("sites", ({ sites = [] }) => {
        sites.forEach(site => {
          chrome.tabs.create({ url: site.url });
        });
        window.close();
      });
    });
  
    document.getElementById("no").addEventListener("click", () => {
      window.close();
    });
  });
  