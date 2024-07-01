///////////////////////////////// Dashboard add course
const getAllCourses = async (setCourses) => {
  const jwtToken = sessionStorage.getItem('jwtToken');
  try {
    const response = await fetch("http://localhost:5000/admin/dashboard/controlpanel/courses", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const result = await response.json();
      setCourses(result);
    }
    else {
      console.error("Failed to get all course(s)");
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const getCourse = async (row) => {
  const jwtToken = sessionStorage.getItem('jwtToken');
  let id = row.original.courseCode;
  try {
    const response = await fetch(`http://localhost:5000/admin/dashboard/controlpanel/courses/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (response.status === 200) {
      return result;
    }
    else {
      console.error(result?.message);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const handleAdd = async (update, setCourses) => {
  const jwtToken = sessionStorage.getItem('jwtToken');
  try {
    const response = await fetch(`http://localhost:5000/admin/dashboard/controlpanel/courses`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    });

    const result = await response.json();
    if (response.status === 201) {
      alert(result.message);
      getAllCourses(setCourses);
    }
    else {
      alert(result?.message || "Error");
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const handleUpdate = async (update, setCourses) => {
  const jwtToken = sessionStorage.getItem('jwtToken');
  let id = update.courseCode;
  try {
    const response = await fetch(`http://localhost:5000/admin/dashboard/controlpanel/courses/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    });
    const result = await response.json();
    if (response.status === 200) {
      alert(result.message);
      getAllCourses(setCourses);
    }
    else {
      alert(result?.message || "Error");
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const handleDelete = async (row, setCourses) => {
  const jwtToken = sessionStorage.getItem('jwtToken');
  let id = row.original.courseCode;
  try {
    const response = await fetch(`http://localhost:5000/admin/dashboard/controlpanel/courses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (response.status === 200) {
        alert(result.message);
        getAllCourses(setCourses);
    }
    else {
      alert(result?.message || "Error");
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export {
  getAllCourses,
  getCourse,
  handleAdd,
  handleUpdate,
  handleDelete}