// typing and deleting skills effect
window.onload = function() {
  var el = document.getElementById('typewrite');
  var cyclingSkills = el.getAttribute('data-type');
  var period = el.getAttribute('data-period');
  if (cyclingSkills) {
    new TypeWrite(el, JSON.parse(cyclingSkills), period);
  }
};

var TypeWrite = function(el, cyclingSkills, period) {
  this.cyclingSkills = cyclingSkills;
  this.el = el;
  this.currentLoop = 0;
  this.period = parseInt(period, 10) || 2000;
  this.skill = '';
  this.tick();
  this.deleting = false;
};

TypeWrite.prototype.tick = function() {
  var idx = this.currentLoop % this.cyclingSkills.length;
  var currentSkill = this.cyclingSkills[idx];

  if (this.deleting) {
    this.skill = currentSkill.substring(0, this.skill.length - 1);
  } else {
    this.skill = currentSkill.substring(0, this.skill.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.skill+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.deleting) {
    delta /= 2;
  }

  if (!this.deleting && this.skill === currentSkill) {
    delta = this.period;
    this.deleting = true;
  } else if (this.deleting && this.skill === '') {
    this.deleting = false;
    this.currentLoop++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

// navbar links
function clickHome() {
  document.documentElement.scrollTop = 0;
}

function clickAbout() {
  let section = document.getElementById("aboutme");
  document.documentElement.scrollTop = section.offsetTop;
}

function clickProjects() {
  let section = document.getElementById("projects");
  document.documentElement.scrollTop = section.offsetTop;
}

function clickSkills() {
  let section = document.getElementById("skills");
  document.documentElement.scrollTop = section.offsetTop;
}

function clickContact() {
  let section = document.getElementById("contact");
  document.documentElement.scrollTop = section.offsetTop;
}

let contactResponse = document.getElementById("response");

function handleSubmit() {
  event.preventDefault();
  let contactName = document.getElementById("name").value;
  let contactEmail = document.getElementById("email").value;
  let contactMessage = document.getElementById("message").value;

  const templateID = "portfolio_contact_form";

  if (contactName === '') {
    contactResponse.innerHTML = 'Your Name cannot be empty';
  } else if (contactEmail === '') {
    contactResponse.innerHTML = 'Your Email cannot be empty';
  } else if (contactMessage === '') {
    contactResponse.innerHTML = 'Your Message cannot be empty';
  } else {
    sendFeedback(templateID, contactName, contactEmail, contactMessage);
  }
}

function sendFeedback(templateId, senderName, senderEmail, senderMessage) {
  let contactName = document.getElementById("name");
  let contactEmail = document.getElementById("email");
  let contactMessage = document.getElementById("message");
  window.emailjs
    .send('portfolio_mailgun', templateId, {
      senderName,
      senderEmail,
      senderMessage
    })
    .then(res => {
      contactResponse.className = "contact-form-success";
      contactResponse.innerHTML = 'Message sent, thanks!';
      contactName.value = '';
      contactEmail.value = '';
      contactMessage.value = '';
    })
    .catch(err => console.error('Failed to send message. Error: ', err));
}
