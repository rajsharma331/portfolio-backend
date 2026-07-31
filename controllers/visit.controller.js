import prisma from "../config/prisma.js";
import geoip from "geoip-lite";
import { sendTelegramMessage } from "../services/telegram.service.js";

export const visitPortfolio = async (req, res) => {
  try {
    const { screen, language, timezone, referrer } = req.body;

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress ||
      req.ip;

    const geo = geoip.lookup(ip);

    const country = geo?.country || "Unknown";
    const city = geo?.city || "Unknown";
    const region = geo?.region || "Unknown";

    const ua = req.useragent;

    let device = "Desktop";
    if (ua.isMobile) device = "Mobile";
    if (ua.isTablet) device = "Tablet";

    const browser = ua.browser;
    const os = ua.os;

    const isp = "Unknown";

    const time = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "medium",
    });

    // Save visitor
    await prisma.visitor.create({
      data: {
        ip,
        country,
        region,
        city,
        browser,
        os,
        device,
        language,
        timezone,
        screen,
        referrer,
        isp,
      },
    });

    const message = `
🚀 New Portfolio Visitor

🌍 Country: ${country}
🏙 City: ${city}
📍 Region: ${region}

📱 Device: ${device}

🌐 Browser: ${browser}
💻 OS: ${os}

📐 Screen: ${screen}

🗣 Language: ${language}

🌐 ISP: ${isp}

🕒 Timezone: ${timezone}

🔗 Referrer: ${referrer || "Direct"}

🕒 Time: ${time}
`;

    await sendTelegramMessage(message);

    res.json({
      success: true,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
    });
  }
};