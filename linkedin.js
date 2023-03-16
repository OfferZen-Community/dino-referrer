function findAncestor(el, selector) {
  while ((el = el.parentElement) && !el.matches(selector));
  return el;
}

// Run pollDOM() if the page loads on the messaging URL
if (window.location.href.startsWith('https://www.linkedin.com/messaging') || window.location.href.startsWith('https://www.linkedin.com/inmail')) {
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
  console.log("Running PollDom")
 //Wait for the toolbar to appear on the page
  const toolbar = document.querySelector('.msg-form__left-actions');

  if (toolbar) {

//Add a listener when the user clicks the button
runUpdates()

//If ther toolbar isn't there yet, try again later.
  } else {
    console.log("Polling");
    setTimeout(pollDOM, 300); // try again in 300 milliseconds
  }
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
  console.log(updatedMessage)
  appendDinoAction(updatedMessage);
});


function appendDinoAction(updatedMessage) {
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
          console.log("Clicked Dino")
          const parentForm = event.target.closest("form");
          const messageBox = parentForm.querySelector('.msg-form__contenteditable[role="textbox"]');
          messageBox.innerHTML = updatedMessage;
          const inputEvent = new Event('input', { bubbles: true });
          messageBox.dispatchEvent(inputEvent);
        });
        
      // Append the new element
      action.appendChild(dinoAction);
    }
  });
}
}




