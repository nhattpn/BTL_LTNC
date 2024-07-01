
const getAllCourses = async (setCourses) => {
  const jwtToken = sessionStorage.getItem('jwtToken');
  try {
    const response = await fetch("http://localhost:5000/student/dashboard/courseregister", {
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
const getRegCourses = async (setRegisteredCourses) => {
  const jwtToken = sessionStorage.getItem('jwtToken');
  try {
    const response = await fetch("http://localhost:5000/student/dashboard/courseregister/viewReg", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const result = await response.json();
      setRegisteredCourses(result);
    }
    else {
      console.error("Failed to get all registered course(s)");
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const handleRegister = async (row, registeredCourses, setRegisteredCourses) => {
  const jwtToken = sessionStorage.getItem('jwtToken');
  const isRegistered = registeredCourses.some(course => course.courseCode === row.original.courseCode);
  if (isRegistered) {
    alert('Failed!!! Subject already registered!');
    return;
  }

  const courseid = row.original.courseCode;
  try {
    const response = await fetch(`http://localhost:5000/student/dashboard/courseregister/reg/${courseid}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const result = await response.json();
      alert('Register subject successfully.');
      getRegCourses(setRegisteredCourses);
    } else {
      console.error("Failed to register subject");
      alert('Failed!!!'); 
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const handleDelete = async (courseCode, setRegisteredCourses) => {
  const jwtToken = sessionStorage.getItem('jwtToken');
  try {
    const response = await fetch(`http://localhost:5000/student/dashboard/courseregister/delOne/${courseCode}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const result = await response.json();
      alert('Registered subject deleted successfully.');
      getRegCourses(setRegisteredCourses);
    }
    else {
      console.error("Failed to delete registered subject");
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const handleDeleteAll = async (setRegisteredCourses) => {
  const jwtToken = sessionStorage.getItem('jwtToken');
  try {
    const response = await fetch(`http://localhost:5000/student/dashboard/courseregister/delAll`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const result = await response.json();
      alert('Entire registered subject deleted successfully.');
      getRegCourses(setRegisteredCourses);
    }
    else {
      console.error("Failed to delete entire registered subject");
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const handleEnroll = async () => {
  const jwtToken = sessionStorage.getItem('jwtToken');
  try {
    const response = await fetch(`http://localhost:5000/student/dashboard/courseregister/confirmReg`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const result = await response.json();
      alert('Enrollment successfully.');
    }
    else {
      console.error("Failed to enrollment.");
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export {
  getAllCourses,
  getRegCourses,
  handleRegister,
  handleDelete,
  handleDeleteAll,
  handleEnroll
}