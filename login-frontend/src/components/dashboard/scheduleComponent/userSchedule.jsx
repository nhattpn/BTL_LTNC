import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';

import { useSelector } from 'react-redux';

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const jwtToken = sessionStorage.getItem('jwtToken');
  const userRole = useSelector((state) => state.user?.userData?.role);

  useEffect(() => {
    getSchedule();
  }, []);

  const getSchedule = async () => {
    try {
      const endpoint = userRole === 'teacher' 
        ? "http://localhost:5000/teacher/dashboard/bangdieukhien"
        : "http://localhost:5000/student/dashboard/schedule";

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const result = await response.json();
        setSchedule(result);
      } else {
        console.error("Failed to get schedule");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const columns = [
    { field: "courseCode", header: "Course Code" },
    { field: "courseName", header: "Course Name" },
    { field: "classroom", header: "Room" },
    { field: "scheduleTime", header: "Time" },
    { field: "scheduleDay", header: "Date" },
    { field: "scheduleWeek", header: "Week" },
  ];

  if (userRole === 'teacher') {
    columns.push(
      { field: "semester", header: "Semester" },
      { field: "credit", header: "Credit" },
      { field: "studentCount", header: "Student Count" }
    );
  } else {
    columns.push({ field: "instructorName", header: "Instructor" });
  }

  return (
    <>
      <h2 style={{fontWeight: 'bold', textAlign: 'center', paddingTop: '2%', textTransform: 'uppercase'}}>{userRole} Schedule</h2>
      <Card title="Week 1" style={{color: '#eba234', textAlign: 'right'}}/>
      <DataTable value={schedule}>
        {columns.map((col, index) => (
          <Column key={index} field={col.field} header={col.header} />
        ))}
      </DataTable>
    </>
  );
};

export default Schedule;