export const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/student/dashboard/thongtinsinhvien", {
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