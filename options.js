// Saves options to chrome.storage
function save_options() {
    var referralcode = document.getElementById('code').value;
    var msg = document.getElementById('msg').value;
    chrome.storage.sync.set({
      referralCode: referralcode,
      referralMessage: msg
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
    restore_options();
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    let message = `Thanks for reaching out. I'm not looking for work right now, but perhaps some time in the future again :)\r\n
If you're looking for folks like me though, I can recommend trying out a platform I use - OfferZen. Everyone there is actively looking, curated, and they have a 99% response rate.\r\n
If you sign up using my link, I'll get rewards from OfferZen and you'll also get a special gift when you sign up.`;
    chrome.storage.sync.get({
      referralCode: 'Not set yet',
      referralMessage: message
    }, function(items) {
      document.getElementById('code').value = items.referralCode;
      document.getElementById('msg').value = items.referralMessage;
      if (items.referralCode != 'Not set yet'){
        document.getElementById('headerCodeStatus').innerHTML = `<div class="code_present">🟢 Ready to refer. Your code is <span id="headerStatusCode"></span></div>`
        document.getElementById('headerStatusCode').textContent = items.referralCode;
      }

    });
  }
  function setAccordians(){
    var acc = document.getElementsByClassName("accordion");
    var i;
    
    for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        console.log("Accordian")
        this.classList.toggle("active");
    
        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
        panel.style.display = "none";
        } else {
        panel.style.display = "block";
        }
    });
    }
    }    

  document.addEventListener('DOMContentLoaded', restore_options);
  document.addEventListener('DOMContentLoaded', setAccordians);
  document.getElementById('save').addEventListener('click',
      save_options);

