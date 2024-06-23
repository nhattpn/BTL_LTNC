
export const handleSubmit = async (e, formData, updateUser) => {
  e.preventDefault();
  const jwtToken = sessionStorage.getItem('jwtToken');
  try {
    const response = await fetch(`http://localhost:5000/${formData.role}/dashboard/${formData.role}info`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Sử dụng dữ liệu từ Redux store
    });

    if (response.ok) {
      updateUser();
      alert('Update successfully.');
    } else {
      console.error('Failed to update student');
      alert(`Failed to update ${formData.role}!`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};