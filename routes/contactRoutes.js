// import express from 'express';
// import Contact from '../models/contactModel.js';

// const router = express.Router();

// router.post('/contact', async (req, res) => {
//     try {
//         const { name, email, message } = req.body;

//         const newContact = new Contact({ name, email, message });
//         await newContact.save();

//         res.status(201).json({ success: true, message: 'Message sent successfully!' });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Server error', error });
//     }
// });

// export default router;

// done




// import express from 'express';
// import Contact from '../models/contactModel.js';
// import nodemailer from 'nodemailer';

// const router = express.Router();

// router.post('/contact', async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     const newContact = new Contact({ name, email, message });
//     await newContact.save();

//     // ✅ Nodemailer setup
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'pinkimandal44066@gmail.com',         // <-- yahan apna Gmail
//         pass: 'ufdn wicn tcvs qvpg'            // <-- App Password (not Gmail login password)
//       }
//     });

//     // ✅ Email content
//     const mailOptions = {
//       from: 'mandalpinki134@gmail.com',
//       to: 'p6745953@gmail.com',             // <-- jahan receive karna hai
//       subject: 'New Contact Form Submission',
//       text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
//     };

//     // ✅ Send email
//     await transporter.sendMail(mailOptions);

//     res.status(201).json({ success: true, message: 'Message sent & email delivered!' });
//   } catch (error) {
//     console.error('Email error:', error);
//     res.status(500).json({ success: false, message: 'Server error', error });
//   }
// });

// export default router;







// DONE MAIL RECIVE 


// import express from 'express';
// import Contact from '../models/contactModel.js';
// import nodemailer from 'nodemailer';

// const router = express.Router();

// router.post('/contact', async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     const newContact = new Contact({ name, email, message });
//     await newContact.save();

//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'pinkimandal44066@gmail.com',
//         pass: 'ufdn wicn tcvs qvpg' // App password
//       }
//     });

//     // ✅ Mail to admin/receiver
//     const adminMailOptions = {
//       from: 'mandalpinki134@gmail.com',
//       to: 'p6745953@gmail.com',
//       subject: 'New Enquiry Received',
//       text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
//     };

//     // ✅ Mail to sender/user
//     const userMailOptions = {
//     //   from: 'mandalpinki134@gmail.com',
//     from: '"SMBULL IT Company" <pinkimandal44066@gmail.com>',
//       to: email, // user ka diya hua email
//       subject: 'Thank you for contacting us!',
//       text: `Dear ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you soon.\n\nRegards,\nTeam SMBULL`
//     };

//     // ✅ Dono mails send karo
//     await transporter.sendMail(adminMailOptions); // admin ko
//     await transporter.sendMail(userMailOptions);  // user ko

//     res.status(201).json({ success: true, message: 'Message sent & emails delivered!' });
//   } catch (error) {
//     console.error('Email error:', error);
//     res.status(500).json({ success: false, message: 'Server error', error });
//   }
// });

// export default router;







import express from 'express';
import Contact from '../models/contactModel.js';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 1️⃣ Save to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // 2️⃣ Setup transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'pinkimandal44066@gmail.com',
        pass: 'ufdn wicn tcvs qvpg', // Gmail App Password
      }
    });

    // 3️⃣ Mail to ADMIN (receiver)
    // const adminMailOptions = {
    //   from: '"SMBULL IT Company" <pinkimandal44066@gmail.com>', // ✅ From company
    //   to: 'pinkimandal44066@gmail.com', // ✅ Company receives contact
    //   subject: 'New Contact Enquiry',
    //   text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    // };



    const adminMailOptions = {
        from: '"SMBULL IT Company" <pinkimandal44066@gmail.com>',
        to: 'pinkimandal44066@gmail.com',
        subject: 'New Contact Enquiry',
        replyTo: email, // 👈 yeh line important hai
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
      };
      
    // 4️⃣ Mail to USER (sender)
    const userMailOptions = {
      from: '"SMBULL IT Company" <pinkimandal44066@gmail.com>', // ✅ Sender sees company reply
      to: email, // User's provided email
      subject: 'Thank you for contacting us!',
      text: `Dear ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you soon.\n\nRegards,\nTeam SMBULL`
    };

    // 5️⃣ Send both emails
    await transporter.sendMail(adminMailOptions); // goes to company
    await transporter.sendMail(userMailOptions);  // goes to user

    res.status(201).json({ success: true, message: 'Message sent & emails delivered!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});

export default router;




