export const TeacherModel = {
  name: '',
  msgv: '',
  private_info: {
    gender: 'O',
    birthday: '',
    degree: '',
    faculty: '',
    cccd: '',
    cccdDay: '',
    cccdLocation: '',
    address: '',
    phoneNumber: '',
    email: '',
    personalEmail: '',
  }   
};
export const Fields = [
  [
    { name: 'name', label: '#Full Name', type: 'text' },
    { name: 'birthday', label: '#Day of Birth', type: 'date' },
    { name: 'cccd', label: '#Identity Card Number', type: 'text' },
    { name: 'msgv', label: '#Teacher ID', type: 'text', readOnly: true }, // Thay đổi mssv thành msgv và label
    { name: 'degree', label: '#Degree', type: 'text' }, // Trường mới cho bằng cấp
    { name: 'cccdDay', label: '#Date of issue of identity card', type: 'date' },
    { name: 'gender', label: '#Sex', type: 'radio' },
    { name: 'faculty', label: '#Faculty', type: 'text' },
    { name: 'cccdLocation', label: '#Place of issue of identity card', type: 'text' },
  ],
  [
    { name: 'address', label: '#Address', type: 'text' },
    { name: 'phoneNumber', label: '#Telephone Number', type: 'text' },
    { name: 'email', label: '#University Email', type: 'email' },
    { name: 'personalEmail', label: '#Other Email', type: 'email' },
  ]
];