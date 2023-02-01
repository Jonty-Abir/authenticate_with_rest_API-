const nodeMailer = require("nodemailer");
const Mailgen = require("mailgen");

async function regiesterMail(req, res, next) {
  try {
    const { username, email, text, subject } = req.body;
    //  create the configaretion object
    const config = {
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PW,
      },
    };

    let transport = nodeMailer.createTransport(config);
    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Abir Santra",
        link: "https://abirsantraonline.netlify.com",
      },
    });
    let emailDetails = {
      body: {
        // name: username,
        intro: text || "",
        outro: "Thank you.",
      },
    };
    // create the email body
    let emailBody = MailGenerator.generate(emailDetails);
    //
    let message = {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      html: emailBody,
    };
    // send email to client
    transport
      .sendMail(message)
      .then(() => {
        res.status(201).json({ msg: "You should recevied a email form us." });
      })
      .catch((err) => {
        res.status(500).json({ error: "email could't send" });
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
module.exports = { regiesterMail };
