const { mysqlPool, pgPool } = require("../db-config");

const addEmployee = async (req, res) => {
  const emp = req.body;
console.log(emp);
  const insertQuery = `
    INSERT INTO employee_master (
      empid, emptype, uno, divno, deptno, secno, sex, marital_status,
      ename, fname, dob, pob, bgroup, mother_toungue, idfm1, idfm2,
      lang_known, 
     
      created_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    emp.empid, emp.emptype, emp.uno, emp.divno, emp.deptno, emp.secno,
    emp.sex, emp.marital_status, emp.ename, emp.fname, emp.dob, emp.pob,
    emp.bgroup, emp.mother_toungue, emp.idfm1, emp.idfm2, emp.lang_known,
 emp.created_by
  ];

  try {
    // Insert into MySQL
    const mysqlConn = await mysqlPool.getConnection();
    await mysqlConn.execute(insertQuery, values);
    mysqlConn.release();

    // Insert into PostgreSQL
    const pgQuery = insertQuery.replace(/\?/g, (_, i) => `$${i + 1}`);
    await pgPool.query(pgQuery, values);

    res.status(201).json({ message: "Employee inserted into both databases." });
  } catch (error) {
    console.error("Insert Error:", error);
    res.status(500).json({ error: "Failed to insert employee." });
  }
};

module.exports = { addEmployee };
