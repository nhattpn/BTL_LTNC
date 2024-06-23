export const StudentModel = {
  name: '',
  userId: '',
  role: 'student',
  private_info: {
    gender: 'O',
    birthday: '',
    classId: '',
    faculty: '',
    cccd: '',
    cccdDay: '',
    cccdLocation: '',
    address: '',
    phoneNumber: '',
    email: '',
    personalEmail: '',
  },
  training_info: {
    yearOfAdmission: '',
    trainingTime: '',
    educationProgram: '',
    status: '',
    expectSemester: '',
    maximumSemester: '',
    AAC: '',
    GPA: '',
    major: '',
    expectGraduationDate: '',
  }    
};
export const Fields = [[
  { name: 'name', label: '#Full Name', type: 'text' },
  { name: 'birthday', label: '#Day of Birth', type: 'date' },
  { name: 'cccd', label: '#Identity Card Number', type: 'text' },
  { name: 'userId', label: '#Student ID', type: 'text', readOnly: true },
  { name: 'classId', label: '#Class', type: 'text' },
  { name: 'cccdDay', label: '#Date of issue of identity card', type: 'date' },
  { name: 'gender', label: '#Sex', type: 'radio' },
  { name: 'faculty', label: '#Faculty', type: 'text' },
  { name: 'cccdLocation', label: '#Place of issue of identity card', type: 'text' },
],[
  { name: 'address', label: '#Address', type: 'text' },
  { name: 'phoneNumber', label: '#Telephone Number', type: 'text' },
  { name: 'email', label: '#University Email', type: 'email' },
  { name: 'personalEmail', label: '#Other Email', type: 'email' },
]];
export const TrainingFields = [[
  { name: 'yearOfAdmission', label: '#Year of Admission', type: 'text' },
  { name: 'trainingTime', label: '#Training Time', type: 'text' },
  { name: 'educationProgram', label: '#Education Program', type: 'text' },
  { name: 'status', label: '#Status', type: 'text' },
  { name: 'expectSemester', label: '#Expected number of semesters', type: 'number' },
  { name: 'maximumSemester', label: '#Maximum Number of Semesters', type: 'number' },
  { name: 'AAC', label: '#Accumulate Academic Credits', type: 'number' },
  { name: 'GPA', label: '#GPA', type: 'number' },
], [
  { name: 'major', label: '#Major', type: 'text' },
  { name: 'expectGraduationDate', label: '#Expected Graduation Date', type: 'date' },
]];