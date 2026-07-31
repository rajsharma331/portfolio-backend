import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import useragent from "express-useragent";
import geoip from "geoip-lite";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(useragent.express());

app.post("/visit", async (req, res) => {
 

  try {
    // Client data from frontend
    const {
      screen,
      language,
      timezone,
      referrer,
    } = req.body;

    // Get real client IP behind Render proxy
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress ||
      req.ip;

    // Geo Location
    const geo = geoip.lookup(ip);

    const country = geo?.country || "Unknown";
    const city = geo?.city || "Unknown";

    // Browser & Device
    const ua = req.useragent;

    let device = "Desktop";

    if (ua.isMobile) device = "Mobile";
    if (ua.isTablet) device = "Tablet";

    const browser = ua.browser;
    const os = ua.os;

    // Indian Time
    const time = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "medium",
    });

    const message = `
🚀 New Portfolio Visitor

🌍 Country: ${country}
🏙 City: ${city}

📱 Device: ${device}

🌐 Browser: ${browser}
💻 OS: ${os}

📐 Screen: ${screen || "Unknown"}

🗣 Language: ${language || "Unknown"}

🕒 Timezone: ${timezone || "Unknown"}

🔗 Referrer: ${referrer || "Direct"}

🕒 Time: ${time}
`;

    await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.CHAT_ID,
        text: message,
      }
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ success: false });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});