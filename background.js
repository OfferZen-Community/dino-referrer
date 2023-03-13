

chrome.runtime.onInstalled.addListener(({ reason, version }) => {
    if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
      showReadme();
    }
  });
  
  chrome.action.onClicked.addListener((tab) => {
    showReadme();
  });
  
  function showReadme(info, tab) {
    const url = chrome.runtime.getURL('options.html');
    chrome.tabs.create({ url });
  }

  
  chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
    console.log("executing")
    if (details.url.indexOf('linkedin.com/messaging') !== -1) {
      // Execute the 'linkedin.js' content script in the current tab
      console.log("is linkedin messaging page")
      const tabId = details.tabId
      chrome.scripting.executeScript({
      target : {tabId : tabId},
      files : [ "linkedin.js" ],
    })
    }
  }, { url: [{ hostEquals: 'www.linkedin.com' }] });
  
//   async function getTabId() {
//     let queryOptions = { active: true, lastFocusedWindow: true };
//     // `tab` will either be a `tabs.Tab` instance or `undefined`.
//     let [tab] = await chrome.tabs.query(queryOptions);
//     return tab.id;
//   }
  
  