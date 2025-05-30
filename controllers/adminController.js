// controllers/adminController.js

export const getDashboardStats = (req, res) => {
  try {
    res.json({
      totalMembers: 254,
      pendingApprovals: 12,
      revenue: 18250,
      newSignups: 37,
    });
  } catch (err) {
    console.error('Dashboard stats error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getChartData = (req, res) => {
  try {
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
  } catch (err) {
    console.error('Chart data error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRecentApprovals = (req, res) => {
  try {
    const recent = [
      { name: 'Amina J.', tier: 'diamond-orchid', date: '2024-05-06' },
      { name: 'Elise M.', tier: 'platinum-lily', date: '2024-05-05' },
      { name: 'Sophia R.', tier: 'gold-rose', date: '2024-05-04' },
    ];
    res.json(recent);
  } catch (err) {
    console.error('Recent approvals error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
