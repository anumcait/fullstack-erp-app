// models/leave-application.js
module.exports = (sequelize, DataTypes) => {
  const LeaveApplication = sequelize.define('LeaveApplication', {
    lno: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    ldate: DataTypes.DATE,
    empid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    ename: DataTypes.STRING(100),
    designation: DataTypes.STRING(50),
    department: DataTypes.STRING(50),
    pofl: DataTypes.STRING(100),
    address: DataTypes.STRING(100),
    phno: DataTypes.BIGINT,
    c_cancel_status: DataTypes.STRING(20),
    c_cancel_empid: DataTypes.BIGINT,
    c_cancel_date: DataTypes.DATE,
    c_unit: DataTypes.STRING(40),
    c_gempid: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    tableName: 'leave_application',
    timestamps: false
  });

  LeaveApplication.associate = (models) => {
    LeaveApplication.hasMany(models.LeaveDetails, {
      foreignKey: 'lno',
      as: 'leaveDetails'
    });
  };

  return LeaveApplication;
};
