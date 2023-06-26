const fs = require('fs');
const path = require('path');
const mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_SECRET, domain: process.env.MAILGUN_DOMAIN});
const mustache = require('mustache');
const juice = require('juice');

module.exports.sendEmail = async (req, res) => {
  // console.log(JSON.stringify(req));
  const emailData = {
    email: req.email,
    resetLink: req.resetLink,
    year: new Date().getFullYear()
  };
  const template = fs.readFileSync(path.resolve(__dirname, req.templatePath), 'utf8');
  const html = juice(mustache.render(template, emailData));
  let data = {
    from: 'postmaster@mailgun.mattcrandell.com',
    to: emailData.email,
    // 'h:Reply-To': emailData.email,
    subject: `Reset Your Password`,
    html
  };
  mailgun.messages().send(data, (error, body) => {
    if (error) {
      // res.render('error', { error });
      // res.status(500).json({ 'error': { error } })
      console.log("got an error: ", error);
    } else {
      console.log(body)
      // res.status(200).json({ 'success': req.successMessage })
    }
  });
};