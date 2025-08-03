const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Employee = sequelize.define(
    'employee_master',
    {
      empid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      emptype: DataTypes.STRING(30),
      uno: DataTypes.INTEGER,
      divno: DataTypes.INTEGER,
      deptno: DataTypes.INTEGER,
      secno: DataTypes.INTEGER,
      sex: DataTypes.CHAR(1),
      marital_status: DataTypes.STRING(10),
      ename: DataTypes.STRING(100),
      fname: DataTypes.STRING(100),
      dob: DataTypes.DATE,
      pob: DataTypes.STRING(50),
      bgroup: DataTypes.STRING(10),
      mother_toungue: DataTypes.STRING(20),
      idfm1: DataTypes.STRING(100),
      idfm2: DataTypes.STRING(100),
      lang_known: DataTypes.STRING(100),
      cadd_sa: DataTypes.STRING(150),
      cadd_city: DataTypes.STRING(50),
      cadd_state: DataTypes.STRING(50),
     // cadd_phone: DataTypes.STRING(50),
     // cadd_mobile: DataTypes.STRING(50),
     // cadd_pin: DataTypes.STRING(50),
      cadd_email: DataTypes.STRING(30),
      padd_sa: DataTypes.STRING(150),
      padd_city: DataTypes.STRING(50),
      padd_state: DataTypes.STRING(50),
     // padd_phone: DataTypes.STRING(50),
    //  padd_mobile: DataTypes.STRING(50),
     // padd_pin: DataTypes.STRING(50),
     // padd_email: DataTypes.STRING(30),
      photo: DataTypes.BLOB('long'),
      uname: DataTypes.STRING(40),
      divname: DataTypes.STRING(40),
      deptname: DataTypes.STRING(40),
      secname: DataTypes.STRING(40),
      c_emp_left_status: DataTypes.CHAR(1),
      c_emp_left_date: DataTypes.DATE,
      c_last_update: DataTypes.DATE,
      c_upd_userid: DataTypes.INTEGER,
      c_gempid: DataTypes.STRING(40),
      employee_profile: DataTypes.TEXT,
      applications: DataTypes.TEXT,
      img_blob: DataTypes.BLOB('long'),
      img_name: DataTypes.STRING(512),
      img_mimetype: DataTypes.STRING(512),
      img_charset: DataTypes.STRING(512),
      img_lastupd: DataTypes.DATE,
      created: DataTypes.DATE,
      created_by: DataTypes.STRING(255),
      updated: DataTypes.DATE,
      updated_by: DataTypes.STRING(255),
      summary: DataTypes.STRING(4000),
      category_id: DataTypes.INTEGER,
    },
    {
      tableName: 'employee_master',
      timestamps: false,
      underscored: true, // 👈 ensures correct column mapping
    },
  
  );

Employee.associate = (models) => {
  Employee.hasOne(models.User, {
    foreignKey: 'empid',
    as: 'user'
  });
};
  return Employee;
};
