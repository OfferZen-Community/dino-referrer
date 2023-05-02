function findAncestor(el, selector) {
  while ((el = el.parentElement) && !el.matches(selector));
  return el;
}

// Run pollDOM() if the page loads on the messaging URL
//if (window.location.href.startsWith('https://www.linkedin.com/messaging') || window.location.href.startsWith('https://www.linkedin.com/inmail')) {
if (window.location.href.startsWith('https://www.linkedin.com')) {
  pollDOM();
}

// Add click event listener to the document
document.addEventListener('click', (event) => {
  // Check if the clicked element or its ancestor matches the desired selector
  const targetElement = event.target.matches('.msg-conversation-listitem__link') ? event.target : findAncestor(event.target, '.msg-conversation-listitem__link');

  // If the desired element is found, run pollDOM()
  if (targetElement) {
    pollDOM();
  }
});

function pollDOM() {
  console.log("Running PollDom");

  const start = Date.now();
  const timeout = 5000; // 5 seconds

  const poll = function() {
    //Wait for the toolbar to appear on the page
    const toolbar = document.querySelector('.msg-form__left-actions');

    if (toolbar) {
      //Add a listener when the user clicks the button
      runUpdates();

    } else if (Date.now() - start < timeout) {
      console.log("Polling");
      setTimeout(poll, 300); // try again in 300 milliseconds

    } else {
      console.log("Polling timed out");
    }
  };

  poll();
}

function runUpdates(){

  //Get the message from storage
chrome.storage.sync.get({
  referralCode: 'Please check your settings in the Dino Referrer Set Up',
  referralMessage: 'Message Error'
}, function(items) {
  var link = "\r\nhttps://www.offerzen.com/hire-developers?utm_source=referral&utm_medium=dinoref&utm_campaign="
  var cleanedMessage = items.referralMessage.replace(/\n/g, "</p><p>");
  const updatedMessage = `<p>` + cleanedMessage + "</p><p>" + link + `${items.referralCode}</p>`;
  appendDinoAction(updatedMessage,items.referralCode);
});


function appendDinoAction(updatedMessage,referralCode) {
  const leftActions = document.querySelectorAll('.msg-form__left-actions');

  leftActions.forEach((action) => {
    // Check if the element has already been appended
    const existingDinoAction = action.querySelector('#dino_action');
    if (!existingDinoAction) {
      // Create the new element
      const dinoAction = document.createElement('div');
      dinoAction.id = 'dino_action';
      dinoAction.innerHTML = `
        <span tabindex="0" class="artdeco-hoverable-trigger artdeco-hoverable-trigger--content-placed-top ember-view">
          <button title="OfferZen Dino Referrer" aria-label="OfferZen Dino Referrer" aria-expanded="false" aria-controls="artdeco-hoverable-msg_pillar_emoji__emoji-hoverable__content" class="msg-form__footer-action emoji-hoverable-trigger artdeco-button artdeco-button--circle artdeco-button--muted artdeco-button--2 artdeco-button--tertiary ember-view" type="button">
            <li-icon aria-hidden="true" class="artdeco-button__icon">
              <img src="https://i.ibb.co/vmmV6CY/dinocorn.png" height="25px">
            </li-icon>
            <span class="artdeco-button__text">Send OfferZen Referral</span>
          </button>
        </span>
        <div id="msg_pillar_emoji__emoji-hoverable__content" class="ember-view">
          <class="ember-view"></div>
        </div>
      `;

//Add the listener
      const dinoActionButton = dinoAction.querySelector('button');
        dinoActionButton.addEventListener("click", function (event) {
          const parentForm = event.target.closest("form");
          const messageBox = parentForm.querySelector('.msg-form__contenteditable[role="textbox"]');
          messageBox.innerHTML = updatedMessage;
          const inputEvent = new Event('input', { bubbles: true });
          messageBox.dispatchEvent(inputEvent);
          logParams(referralCode,"dinoButton")
        });
        
      // Append the new element
      action.appendChild(dinoAction);
    }
  });
}
}

function logParams(referralCode, action) {
  var xhr = new XMLHttpRequest();
  var url = "https://script.google.com/macros/s/AKfycbzohwIVx3E1trytnFNXcSexkr1uXIwYWpZiGOFOqtY8Cxamy3ZhdVoDPqmephfpcpLC/exec"; 
  var params = "?referralCode=" + referralCode + "&action=" + action;
  xhr.open("GET", url + params, true);
  xhr.send();
}



