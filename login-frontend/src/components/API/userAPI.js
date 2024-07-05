import { updateUserImage } from "../../store/feature/userReducer";
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
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      updateUser();
      alert('Update successfully.');
    } else {
      console.error(`Failed to update ${formData.role}`);
      alert(`Failed to update ${formData.role}!`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const uploadImg = async ( imgSelect, user, dispatch) => {
  const jwtToken = sessionStorage.getItem('jwtToken');
  if (!imgSelect) return;

  const formData = new FormData();
  formData.append(`${user.role}_image`, imgSelect);
  formData.append('userId', user.userId);
  
  try {
    const response = await fetch(`http://localhost:5000/${user.role}/dashboard/${user.role}info/updatePicture`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      dispatch(updateUserImage(data.image));
      alert('Update image successfully.');
    }
    else {
      console.error(`Failed to update image`);
      alert(`Failed to update image! Try again`);
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    alert('Failed to upload image! Try again');
  }
};