// routes/jasperRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/report', async (req, res) => {
  const { movid } = req.query;

  if (!movid) {
    return res.status(400).send('Missing empid');
  }

  try {
    const response = await axios.get('http://eqicapex/Jasper/report', {
      responseType: 'arraybuffer',
      params: {
        _repName: 'userperm',
        _repFormat: 'pdf',
        _dataSource: 'EHR',
        P_IDNO: movid
      }
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.send(response.data);
  } catch (error) {
    console.error('Jasper report fetch failed:', error.message);
    res.status(500).send('Failed to fetch report from Jasper');
  }
});

module.exports = router;
