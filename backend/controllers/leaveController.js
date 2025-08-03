const { LeaveApplication, LeaveDetails } = require('../models');

const { Sequelize } = require('sequelize');


exports.applyLeave = async (req, res) => {
  const { application, leaveDetails } = req.body;
  const t = await LeaveApplication.sequelize.transaction();

  try {
    // ✅ Step 1: Get MAX(lno) without lock
    const maxLnoResult = await LeaveApplication.findOne({
      attributes: [
        [Sequelize.fn('COALESCE', Sequelize.fn('MAX', Sequelize.col('lno')), 0), 'maxLno']
      ],
      raw: true // 🟢 ensures plain object
    });

    const nextLno = Number(maxLnoResult.maxLno) + 1;

    // ✅ Step 2: Set lno manually
    application.lno = nextLno;

    // ✅ Step 3: Create master record
    const newApp = await LeaveApplication.create(application, { transaction: t });

    // ✅ Step 4: Insert details
    const detailsWithLno = leaveDetails.map(d => ({ ...d, lno: nextLno }));
    await LeaveDetails.bulkCreate(detailsWithLno, { transaction: t });

    // ✅ Step 5: Commit transaction
    await t.commit();
    res.status(201).json({ message: 'Leave application submitted successfully.', lno: nextLno });
  } catch (error) {
    await t.rollback();
    console.error("❌ Error in /api/leave/apply:", error);
    res.status(500).json({ message: 'Failed to submit leave application.', error });
  }
};


// Get next available leave application number
exports.getNextLeaveNumber = async (req, res) => {
  try {
    const maxLno = await LeaveApplication.max('lno');
    const nextLno = (maxLno || 0) + 1;

    res.json({ nextLno });  // Sends the response correctly

  } catch (error) {
    console.error('Failed to fetch next leave number:', error);
    res.status(500).json({ message: 'Failed to get next leave application number.' });
  }
};
// exports.getAllLeaves = async (req, res) => {
//   try {
//     const data = await LeaveApplication.findAll({
//       include: [{
//         model: LeaveDetails,
//         as: 'leaveDetails',
//         required: true
//       }],
//       order: [['lno', 'DESC']]
//     });

//      res.json(data);
//    } catch (error) {
//      console.error('❌ Error fetching leaves:', error);
//      res.status(500).json({ message: 'Failed to fetch leave data.', error });
//    }
//  };
exports.getAllLeaves = async (req, res) => {
  try {
    const { empid, from, to } = req.query;

    const where = {};
    if (empid) where.empid = empid;
    if (from && to) where.ldate = { [Op.between]: [from, to] };

    const reports = await LeaveApplication.findAll({
      where,
      include: [{ model: LeaveDetails, as: 'leaveDetails' }],
      order: [['lno', 'DESC']]
    });

    res.json(reports);
  } catch (err) {
    console.error("❌ Error in getLeaveReport:", err);
    res.status(500).json({ message: 'Failed to fetch leave report.' });
  }
};