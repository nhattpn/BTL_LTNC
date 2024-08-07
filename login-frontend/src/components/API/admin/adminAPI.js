import { useSelector } from "react-redux";
export const getData = async (user, row) => {
  let userId = row.userId;
  const jwtToken = sessionStorage.getItem('jwtToken');
  try {
    const response = await fetch(`http://localhost:5000/admin/dashboard/${user}/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const result = await response.json();
      return result;
    }
    else {
      console.error("Failed to get user");
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getAllUser = async (user) => {
  const jwtToken = sessionStorage.getItem('jwtToken');
  try {
    const response = await fetch(`http://localhost:5000/admin/dashboard/${user}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const result = await response.json();
      return result
    }
    else {
      console.error("Failed to get all student(s)");
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const handleAdd = async (user, name, email, password, setUsers) => {
  const jwtToken = sessionStorage.getItem('jwtToken');

  try {
    const response = await fetch(`http://localhost:5000/admin/dashboard/${user}/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const result = await response.json();
    if (response.status === 201) {
      alert(result.message);
      const Users = await getAllUser(user);
      setUsers(Users);
    }
    else {
      alert(result?.message || "Error");
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const handleDelete = async (user, row, setUsers) => {
  const jwtToken = sessionStorage.getItem('jwtToken');
  let userId = row.userId;
  try {
    const response = await fetch(`http://localhost:5000/admin/dashboard/${user}/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (response.status === 200) {
      alert(result.message);
      const Users = await getAllUser(user);
      setUsers(Users);
    }
    else {
      alert(result?.message || "Error");
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const handleSubmit = async (e, formData, updateUser) => {
  e.preventDefault();
  const jwtToken = sessionStorage.getItem('jwtToken');
  const id = formData.userId;
  try {
    const response = await fetch(`http://localhost:5000/admin/dashboard/${formData.role}/${id}`, {
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
      alert(`Failed to update ${formData.role}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
