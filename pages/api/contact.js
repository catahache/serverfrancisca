const nodemailer = require("nodemailer");
require("dotenv").config();

const PASSWORD = process.env.password;
export default async(req, res) => {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "serverfrancisca@gmail.com",
      pass: PASSWORD,
    },
    secure: true,
  });

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            reject(error);
        } else {
            console.log("Server is ready to take our messages");
            resolve(success);
        }
    });
});

  const mailData = {
    from: {
        name: 'holisss',
        address: "serverfrancisca@gmail.com",
    },
    to: "dilanbernbae043@gmail.com",
    subject: `Message From ${req.body.name}`,
    text: req.body.message,
    html: req.body.message
   }

   await new Promise((resolve, reject) => {
     // send mail
     transporter.sendMail(mailData, (err, info) => {
       if (err) {
         console.error(err);
         reject(err);
       } else {
         console.log(info);
         resolve(info);
       }
     });
   });
res.status(200).json({ status: "OK" })
}
