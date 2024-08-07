const scoreboardModel = require("../../../models/course.model");
const student = require("../../../models/student.model")
//***************/
// route: "/student/dashboard" 
//***************/

const getScoreboard = async (req, res) => {// get: ../scoreboard
    const { userId } = req.user;
    try {
        const sv_filter = {"userId": userId};
        const st = await student.findOne(sv_filter)
        const cou = st.courseEnroll;
        if (!cou) {
            return res.status(404).json({ message: "Scoreboard not found." });
        }
        res.send(cou);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getScoreboardBySem = async (req, res) => {// get: ../scoreboard/:semester
    const { userId } = req.user;
    const { semester } = req.params
    try {
        const sv_filter = {"userId": userId};
        const sem_filter = {"semester": semester}
        const cou = await student.aggregate([
            {$match: sv_filter},
            {$unwind: "$courseEnroll"},
            {$replaceRoot: {newRoot: "$courseEnroll"}},
            {$match: sem_filter}
        ])
        if (!cou) {
            return res.status(404).json({ message: "Scoreboard not found." });
        }
        res.send(cou);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getScoreboard, getScoreboardBySem };