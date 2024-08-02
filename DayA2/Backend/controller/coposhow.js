import { connection as db } from "../config/dbConfig.js";

// Show course
export const showCourse = (req, res) => {
  const { uid} = req.params;

  const sql = `select u.usercourse_id, u.user_id, c.course_name,u.course_id,u.academic_year
from user_course as u inner join
course as c on u.course_id=c.courseid where u.user_id=?`;
  db.query(sql, uid, (err, result) => {
    if (err) {
      console.error("Error fetching CO-PO records:", err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.status(200).json(result);
  });
};

//show co po 
export const showCopo = (req, res) => {
    const { uid} = req.params;
     const sql = `select u.idcos,u.usercourse_id,u.co_name,c.co_id,c.po_1,c.po_2,c.po_3,c.po_4,c.po_5,c.po_6,c.po_7,c.po_8,c.po_9,c.po_10,c.po_11,c.po_12,c.pso_1,c.pso_2,c.co_po_id from cos as u inner join co_po as c on u.idcos=c.co_id where u.usercourse_id=?`;
    db.query(sql, uid, (err, result) => {
      if (err) {
        console.error("Error fetching CO-PO records:", err);
        return res.status(500).json({ error: "Database error" });
      }
      return res.status(200).json(result);
    });
  };

//UPdate co po 
export const updateCopo = (req, res) => {
    const { co_id } = req.params;
    const {
      po_1, po_2, po_3, po_4, po_5, po_6, po_7, po_8, po_9, po_10, po_11, po_12,
      pso_1, pso_2
    } = req.body;
  
    const sql = `UPDATE co_po SET 
      po_1 = ?, po_2 = ?, po_3 = ?, po_4 = ?, po_5 = ?, po_6 = ?, po_7 = ?, po_8 = ?, po_9 = ?, po_10 = ?, po_11 = ?, po_12 = ?, 
      pso_1 = ?, pso_2 = ? 
      WHERE co_id = ?;`;
  
    db.query(sql, [
      po_1, po_2, po_3, po_4, po_5, po_6, po_7, po_8, po_9, po_10, po_11, po_12,
      pso_1, pso_2, co_id
    ], (err, result) => {
      if (err) {
        console.error("Error updating CO-PO records:", err);
        return res.status(500).json({ error: "Database error" });
      }
      return res.status(200).json(result);
    });
  };
  