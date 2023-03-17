

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
    if (details.url.indexOf('linkedin.com/messaging') !== -1) {
      // Execute the 'linkedin.js' content script in the current tab if the user navigated to the messaging page
      const tabId = details.tabId
      chrome.scripting.executeScript({
      target : {tabId : tabId},
      files : [ "linkedin.js" ],
    })
    }
  }, { url: [{ hostEquals: 'www.linkedin.com' }] });
  
