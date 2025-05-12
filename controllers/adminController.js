// controllers/adminController.js

const getDashboardStats = (req, res) => {
    res.json({
      totalMembers: 254,
      pendingApprovals: 12,
      revenue: 18250,
      newSignups: 37,
    });
  };
  
  const getChartData = (req, res) => {
    const sample = [
      { date: '2024-05-01', signups: 5, revenue: 1200 },
      { date: '2024-05-02', signups: 7, revenue: 2000 },
      { date: '2024-05-03', signups: 3, revenue: 950 },
      { date: '2024-05-04', signups: 8, revenue: 2400 },
      { date: '2024-05-05', signups: 4, revenue: 1100 },
      { date: '2024-05-06', signups: 6, revenue: 1700 },
      { date: '2024-05-07', signups: 2, revenue: 850 },
    ];
    res.json(sample);
  };
  
  const getRecentApprovals = (req, res) => {
    const recent = [
      { name: 'Amina J.', tier: 'diamond-orchid', date: '2024-05-06' },
      { name: 'Elise M.', tier: 'platinum-lily', date: '2024-05-05' },
      { name: 'Sophia R.', tier: 'gold-rose', date: '2024-05-04' },
    ];
    res.json(recent);
  };
  
  module.exports = {
    getDashboardStats,
    getChartData,
    getRecentApprovals,
  };
  