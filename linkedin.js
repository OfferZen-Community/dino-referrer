

function pollDOM() {
 //Wait for the toolbar to appear on the page
  const toolbar = document.querySelector('.msg-form__left-actions');
  if (toolbar) {
//Add a button to click on. Totally just copy pasted here - should probably clean this up at some point. 
var item = document.createElement("div")
item.innerHTML = `<div id = "dino_action"><span tabindex="0" class="artdeco-hoverable-trigger artdeco-hoverable-trigger--content-placed-top ember-view"><button title="OfferZen Dino Referrer" aria-label="OfferZen Dino Referrer" aria-expanded="false" aria-controls="artdeco-hoverable-msg_pillar_emoji__emoji-hoverable__content" class="msg-form__footer-action emoji-hoverable-trigger artdeco-button artdeco-button--circle artdeco-button--muted artdeco-button--2 artdeco-button--tertiary ember-view" type="button">  <li-icon aria-hidden="true" class="artdeco-button__icon"><img src="https://i.ibb.co/vmmV6CY/dinocorn.png" height="25px"> </li-icon><span class="artdeco-button__text">Send OfferZen Referral/span></button></span> <div id="msg_pillar_emoji__emoji-hoverable__content" class="ember-view"><class="ember-view"></div></div></div>`
//Add a listener when the user clicks the button
item.addEventListener("click", function() {
    
    //Set the text in the box, and fire an input event
    updateMessage(function(updatedMessage) {
        const messageBox = document.querySelector('.msg-form__contenteditable[role="textbox"]');
        messageBox.innerHTML = updatedMessage;
        const inputEvent = new Event('input', { bubbles: true });
        messageBox.dispatchEvent(inputEvent);
    });
});

//Add the button
toolbar.appendChild(item)

//If ther toolbar isn't there yet, try again later.
  } else {
    console.log("Polling");
    setTimeout(pollDOM, 300); // try again in 300 milliseconds
  }
}

pollDOM();

function updateMessage(callback){
  chrome.storage.sync.get({
    referralCode: 'PLease check your settings in the Dino Referrer Set Up',
    referralMessage: 'Message Error'
  }, function(items) {
    var link = "\r\nhttps://www.offerzen.com/hire-developers?utm_source=referral&utm_medium=dinoref&utm_campaign="
    var cleanedMessage = items.referralMessage.replace(/\n/g, "</p><p>");
    const updatedMessage = `<p>` + cleanedMessage + "</p><p>" + link + `${items.referralCode}</p>`;
    callback(updatedMessage);
  });
}
