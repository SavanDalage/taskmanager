const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "nekomimiwolf@gmail.com",
    subject: "Welcome to Kris's Task Manager",
    text: `Welcome to the Task MAnager App, ${name}. Let me know what new features would You like to see in the app.`,
    // html: "", // można robić bardziej skomplikowane e-maile, z obrazkami etc.,
  });
};

const sendGoodbyEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "nekomimiwolf@gmail.com",
    subject: "Delete account confirmation",
    text: `Dear, ${name}, this is confirmation that Your account and all personal data was removed from Kris's Task Manager app.`,
    // html: "", // można robić bardziej skomplikowane e-maile, z obrazkami etc.,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendGoodbyEmail,
};
