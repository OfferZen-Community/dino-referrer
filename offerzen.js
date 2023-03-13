console.log("Running!")

//Add the dino to the toolbar
function pollDOM() {
  //Wait for the toolbar to appear on the page
  const linkBox = document.querySelector('.referral-link');
  if (linkBox) {
    scrape_code();
  //If ther box isn't there yet, try again later.
  } else {
    console.log("Polling");
    setTimeout(pollDOM, 300); // try again in 300 milliseconds
  }
}

pollDOM();

function scrape_code() {
  var referralCodeString = document.querySelector('.referral-link').value;
  var referralCode = referralCodeString.split("/").pop();
  console.log(referralCode);
  chrome.storage.sync.set({
    referralCode: referralCode
  }, function() {
    // Update status to let user know options were saved.
    setTimeout(function() {
      window.alert(`Your OfferZen referral code ${referralCode} has been saved to Dino Referrer`);
    }, 500); // Delay the alert by 500 milliseconds to give the page time to render.
  });
}
