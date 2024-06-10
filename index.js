const connectDB = require('./database');
const User = require('./userModel');
const nodemailer = require('nodemailer');

require('dotenv').config();

connectDB();


const sendEmails = async () =>{
    try{
        console.log('Fetching emails from the "emails" collection...');
        const emails = await User.find({}, 'email').exec();
        console.log('Emails fetched:', emails);

        let transporter = nodemailer.createTransport({
            service:'gmail',
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            auth:{
                user:'patnayakpanku@gmail.com',
                pass:process.env.PASSWORD,

            }
        })
        let cnt = 0 ;
        for(const doc of emails){
            let mailOptions = {
                from:'patnayakpanku@gmail.com',
                to:doc.email,
                subject:`welcom ${doc.email}`,
                text:`thanks for onboarding with use hope you enjoy our services you are our first ${cnt++}`
            }

            try {
                let info = await transporter.sendMail(mailOptions);
                console.log(`Email sent to ${doc.email}: ${info.response}`);
            } catch (error) {
                console.log(`Error in sending mail to ${doc.email}: `, error);
            }
        }


    }
    catch(error){
        console.log(error);
    }
}

sendEmails();