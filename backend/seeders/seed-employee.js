// seeders/seed-employee.js
const sequelize = require('../config/db');
const EmployeeMaster = require('../models/employee-master');

// Test connection and insert dummy data
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');

    const Employee = EmployeeMaster(sequelize);

    // Optional: Create table if not exists
    // await Employee.sync({ force: false });

    await Employee.create({
      empid: 1001,
      emptype: 'Employee',
      uno: 1,
      divno: 1,
      deptno: 10,
      secno: 101,
      sex: 'M',
      marital_status: 'Single',
      ename: 'John Doe',
      fname: 'Michael Doe',
      dob: new Date('1990-05-15'),
      pob: 'Hyderabad',
      bgroup: 'O+',
      mother_toungue: 'Telugu',
      idfm1: 'Passport',
      idfm2: 'Aadhar',
      lang_known: 'English, Hindi',
      cadd_sa: 'Street 123',
      cadd_city: 'Hyderabad',
      cadd_state: 'Telangana',
      cadd_phone: 1234567890,
      cadd_mobile: 9876543210,
      cadd_pin: 500001,
      cadd_email: 'john@example.com',
      padd_sa: 'Village Lane',
      padd_city: 'Warangal',
      padd_state: 'Telangana',
      padd_phone: 1112223334,
      padd_mobile: 9988776655,
      padd_pin: 506001,
      padd_email: 'john.alt@example.com',
      created: new Date(),
      created_by: 'admin'
    });

    console.log('✅ Seed data inserted successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Unable to connect or insert seed data:', error);
    process.exit(1);
  }
})();
