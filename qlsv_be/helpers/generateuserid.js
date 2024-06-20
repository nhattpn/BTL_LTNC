const Teacher = require('../models/teacher.model');
const Student = require("../models/student.model");

// Generate a unique userId
const generateUniqueUserId = async (isTeacher = false) => {
  let userId = "";
  let isUnique = false;

  while (!isUnique) {
    userId = generateRandomUserId(isTeacher); // Truyền vào tham số isTeacher để xác định phạm vi random

    const existingUser = isTeacher
      ? await Teacher.findOne({ userId: userId })
      : await Student.findOne({ userId: userId });

    if (!existingUser) {
      isUnique = true;
    }
  }

  return userId;
};

// Generate a random userId based on role
const generateRandomUserId = (isTeacher) => {
  const min = isTeacher ? 10000 : 2210000;  // Điều kiện để xác định phạm vi
  const max = isTeacher ? 19999 : 2219999;

  const randomUserId = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomUserId.toString();
};

module.exports = {
  generateUniqueUserId,
};

