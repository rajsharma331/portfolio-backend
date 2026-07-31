import prisma from "../config/prisma.js";

export const getAnalytics = async (req, res) => {
  try {
    const totalVisitors = await prisma.visitor.count();

    const countries = await prisma.visitor.groupBy({
      by: ["country"],
      _count: {
        country: true,
      },
      orderBy: {
        _count: {
          country: "desc",
        },
      },
    });

    const browsers = await prisma.visitor.groupBy({
      by: ["browser"],
      _count: {
        browser: true,
      },
    });

    const devices = await prisma.visitor.groupBy({
      by: ["device"],
      _count: {
        device: true,
      },
    });

    const referrers = await prisma.visitor.groupBy({
      by: ["referrer"],
      _count: {
        referrer: true,
      },
    });

    res.json({
      totalVisitors,
      countries,
      browsers,
      devices,
      referrers,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};