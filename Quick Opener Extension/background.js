chrome.runtime.onStartup.addListener(() => {
    chrome.storage.sync.get("sites", ({ sites }) => {
      if (sites && sites.length > 0) {
        chrome.windows.create({
          url: chrome.runtime.getURL("confirm.html"),
          type: "popup",
          width: 300,
          height: 150
        });
      }
    });
  });
  