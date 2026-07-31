import prisma from "../config/prisma.js";

export const getAnalytics = async (req, res) => {
  try {

    const today = new Date();
    today.setHours(0, 0, 0, 0);


    const [
      totalVisitors,
      todayVisitors,
      countries,
      browsers,
      devices,
      recentVisitors,
      topReferrer,
    ] = await Promise.all([

      prisma.visitor.count(),

      prisma.visitor.count({
        where: {
          createdAt: {
            gte: today,
          },
        },
      }),

      prisma.visitor.groupBy({
        by: ["country"],
        _count: {
          country: true,
        },
      }),

      prisma.visitor.groupBy({
        by: ["browser"],
        _count: {
          browser: true,
        },
      }),

      prisma.visitor.groupBy({
        by: ["device"],
        _count: {
          device: true,
        },
      }),

      prisma.visitor.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      }),

      prisma.visitor.groupBy({
        by: ["referrer"],
        _count: {
          referrer: true,
        },
        orderBy: {
          _count: {
            referrer: "desc",
          },
        },
        take: 1,
      }),

    ]);


    res.json({
      totalVisitors,
      todayVisitors,
      countries,
      browsers,
      devices,
      recentVisitors,
      topReferrer,
    });


  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
export const getDailyVisitors = async (req, res) => {
  try {
    const visitors = await prisma.visitor.findMany({
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const dailyMap = {};

    visitors.forEach((visitor) => {
      const date = visitor.createdAt.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });

      dailyMap[date] = (dailyMap[date] || 0) + 1;
    });


    const chartData = Object.entries(dailyMap).map(
      ([date, visitors]) => ({
        date,
        visitors,
      })
    );


    res.json(chartData);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};