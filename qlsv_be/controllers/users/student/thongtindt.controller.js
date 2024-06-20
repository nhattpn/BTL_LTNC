const daotaoModel = require("../../../models/student.model");
//***************/
// route: "/student/dashboard" 
//***************/

// Get all lich thi
const getAllDaoTao = async (req, res) => {// get: ../thongtindaotao
    const { userId } = req.user;
    try {
        const student = await daotaoModel.find({
            "userId": userId
        });
        if (!student) {
            return res.status(404).json({ message: "Thong tin sinh vien not found." });
        }
        const result = student.map(sv => ({
            userId: sv.userId,
            training_info: sv.training_info
        }));
        res.json(result);
    } catch (error) {
        res.json({ message: error });
    }
};



module.exports = { getAllDaoTao };