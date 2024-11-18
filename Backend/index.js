dotenv.config();
import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import Agenda from "agenda";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT;

// MongoDB connection
async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODBURL);
    console.log("Connected to DB");
  } catch (error) {
    console.error("DB Connection Error:", error);
  }
}

connectToDB();

app.use(cors({
  origin: 'https://emailautomationtool-co0n.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options("*", cors()); // Explicitly handle OPTIONS requests

app.use(express.json());

// Agenda setup
const agenda = new Agenda({
  db: {
    address: process.env.MONGODBURL,
    collection: 'agendaJobs',
  },
});

// Email sending job definition
agenda.define('send email', async (job) => {
  const { to, type } = job.attrs.data;
  let subject = '';
  let emailBody = '';


  const link = "https://futureblink.com/";  

  if (type === 'email') {
    subject = 'Welcome!';
    emailBody = `
      <html>
        <body>
          <p>Hello,</p>
          <p>Welcome to our platform! We're excited to have you on board.</p>
          <p>Click here to get started: <a href=${link}>Get Started</a></p>
        </body>
      </html>
    `;
  } else if (type === 'task') {
    subject = 'Complete Your Task';
    emailBody = `
      <html>
        <body>
          <p>Hello,</p>
          <p>Please click the link below to complete your task:</p>
          <p><a href="${link}">Complete Task</a></p>
        </body>
      </html>
    `;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      html: emailBody,
    });

    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
  }
});

// Start Agenda after defining jobs
(async () => {
  try {
    await agenda.start();
    console.log("Agenda started");
  } catch (error) {
    console.error("Error starting agenda:", error);
  }
})();


// Email scheduling route
app.post("/sendEmail", async (req, res) => {
  const { Source, SourceList, Outreach } = req.body;

  if(!req.body){
    return;
  }

  try {
    const usersData = await User.find({
      'source.source_name': Source,
      'source.source_lists': { $all: SourceList },
    });

    Outreach.forEach((data) => {
      usersData.forEach((user) => {
        const delayValue = data.delay?.value || 1;
        const delayUnit = data.delay?.unit || 'seconds';

        agenda.schedule(`in ${delayValue} ${delayUnit}`, 'send email', {
          to: user.email,
          type: data.type,
        });
      });
    });

    res.status(200).json("Emails scheduled successfully");
  } catch (error) {
    console.error("Error scheduling emails:", error);
    res.status(500).json("Error scheduling emails");
  }
});


// Error handling for undefined routes
app.all("*", (req, res) => {
  res.status(404).send("Route not found");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong");
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  await agenda.stop();
  console.log("Agenda stopped");
  process.exit(0);
});

app.listen(port, () => {
  console.log(`Server Listening on Port ${port}`);
});
