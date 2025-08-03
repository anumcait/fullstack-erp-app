const bcrypt = require('bcrypt');
const { User, employee_master } = require('../models');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username, is_active: true },
      include: [{ model: employee_master, 
        as: 'employee',
    attributes: ['ename'] }]
    });


    if (!user) {
      return res.status(401).json({ message: 'Employee not found' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Save session info
    req.session.user = {
      id: user.id,
      username: user.username,
      empid: user.empid,
      role: user.role,
      ename: user.employee?.ename || 'Guest'
    };

    // Update login metadata
    await user.update({
      last_login: new Date(),
      login_count: user.login_count + 1
    });

    res.json({ message: 'Login successful', user: req.session.user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};





