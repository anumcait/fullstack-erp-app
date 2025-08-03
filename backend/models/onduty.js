module.exports = (sequelize, DataTypes) => {
  const OnDutyApplication = sequelize.define('OnDutyApplication', {
    movement_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    movement_date: DataTypes.DATE,
    empid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    ename: DataTypes.STRING(100),
    unit: DataTypes.STRING(50),
    division: DataTypes.STRING(50),
    designation: DataTypes.STRING(50),
    act_date: DataTypes.DATE,
    shift: DataTypes.STRING(10),
    perm_ftime: DataTypes.TIME,
    perm_ttime: DataTypes.TIME,
    no_of_hrs: DataTypes.DECIMAL(5, 2),
    reason_perm: DataTypes.TEXT,
    created_by: DataTypes.STRING(50),
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: 'Pending'
    }
  }, {
    tableName: 'onduty_permission',
    timestamps: false
  });

  return OnDutyApplication;
};
