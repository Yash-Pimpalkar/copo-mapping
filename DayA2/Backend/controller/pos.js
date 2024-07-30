import { connection as db } from "../config/dbConfig.js";

export const showpos = (req, res) => {
const branch=req.body.branch;
const sql="SELECT * FROM POS WHERE BRANCH_id=?"
db.query(sql,branch,(error,result)=>{
    if (error){
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
    res.status(200).json(result)
})
}


