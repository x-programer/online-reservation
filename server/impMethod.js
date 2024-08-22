const nodemailer = require('nodemailer');
let OTP = 0;

// OTP genratore method in node js ...
function generateNumericOTP() {
    let digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

OTP = generateNumericOTP();


function emailSender(email){

    // Create the transporter with the required configuration for Outlook
    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com', // Outlook SMTP server
        port: 587, // Port for TLS
        secureConnection: false, // Disable secure connection (we'll enable TLS)
        auth: {
            user: 'alanna12383@outlook.com', // Your Outlook email address
            pass: 'Shravana@0205', // Your Outlook password
        },
        tls: {
            ciphers: 'SSLv3', // Enable SSLv3 encryption
        },
    });
    
    // Define email data
    const mailOptions = {
        from: 'alanna12383@outlook.com', // Sender address
        to: email, // Recipient address
        subject: 'Hello from Netflix', // Subject line
        text: 'This Email is from Netflix !', // Plain text body
        html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Your Email Subject</title>
                    <style>
                        /* Add your custom styles here */
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f5f5f5;
                            padding: 20px;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 5px;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            color: #333;
                        }
                        p {
                            color: #666;
                        }
                        /* Add more styles as needed */
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Email form Netflix</h1>
                        <p>Hello there! This is from Netflix for Your Login</p>
                        <p>This is your OTP <strong> ${OTP} </strong></p>
                        <p>Best regards,</p>
                        <p>@netflix.com</p>
                    </div>
                </body>
                </html>
        `, // HTML body
    };
    
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
    
}
module.exports = {
    emailSender,
    OTP
}
