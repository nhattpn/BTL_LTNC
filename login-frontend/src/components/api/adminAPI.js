
import { useSelector, useDispatch } from 'react-redux';


export const getData = async (row, type) => {
    let userId = row.original.userId;
    console.log("test", userId);
    const jwtToken = sessionStorage.getItem('jwtToken');
    try {
      const response = await fetch(`http://localhost:5000/admin/dashboard/${type}/${userId}`, {
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
    const response = await fetch(`http://localhost:5000/admin/dashboard/${user.name}`, {
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
      console.error("Failed to get all student(s)");
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
