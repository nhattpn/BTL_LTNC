import React, { useMemo, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Table, Button, Modal, Form, Row, Col, Tab, ListGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

import CourseHeader from '../../components/header_footer/CourseHeader';
import Footer from '../../components/header_footer/Footer';

const CourseRegistration = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [courses, setCourses] = useState([
    {
      'courseCode': 'CO2039',
      'courseName': 'LTNC',
      'classroom': '413-H6',
      'credit': '40',
      'instructorName': 'Mai Đức Trung',
      'scheduleDay': 'Thứ 2',
      'scheduleTime': '13:00-15:00',
    },
    {
      'courseCode': 'COxxxx',
      'courseName': 'XYZ',
      'classroom': '202-H6',
      'credit': '50',
      'instructorName': 'Tên Giảng Viên',
      'scheduleDay': 'Thứ 3',
      'scheduleTime': 'hh:mm-hh:mm',
    }
  ]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [registeredCourses, setRegisteredCourses] = useState([
    {
      'stt': '',
      'courseCode': '',
      'courseName': '',
      'classroom': '',
      'credit': '',
      'instructorName': '',
      'scheduleDay': '',
      'scheduleTime': '',
    }
  ]);

  // Lấy JWT từ Session Storage
  const jwtToken = sessionStorage.getItem('jwtToken');
  // Gửi yêu cầu GET với JWT trong header
  const getCourses = async () => {
    try {
      const response = await fetch("http://localhost:5000/student/dashboard/dangkimon", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const result = await response.json();
        console.log("All course(s):", result);

        setCourses(result);
      }
      else {
        console.error("Failed to get all course(s)");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const getRegCourses = async () => {
    try {
      const response = await fetch("http://localhost:5000/student/dashboard/dangkimon/viewReg", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const result = await response.json();
        console.log("All registered course(s):", result);

        setRegisteredCourses(result);
      }
      else {
        console.error("Failed to get all registered course(s)");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const handleRegister = async (row) => {
    for (let i in registeredCourses) {
      if (row.original.courseCode === registeredCourses[i]['courseCode']) {
        alert('Subject has been registered!!!');
        return;
      }
    }
    console.log('Đăng ký cho:', row.original);
    let courseid = row.original.courseCode;
    try {
      const response = await fetch(`http://localhost:5000/student/dashboard/dangkimon/reg/${courseid}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const result = await response.json();
        console.log("Register subject successfully");

        alert('Register subject successfully.');

        getRegCourses();
      }
      else {
        console.error("Failed to register subject");

        alert('Subject has been registered!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleDelete = async (courseCode) => {
    //event.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/student/dashboard/dangkimon/delOne/${courseCode}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const result = await response.json();
        console.log("Registered subject deleted successfully");

        alert('Registered subject deleted successfully.');

        getRegCourses();
      }
      else {
        console.error("Failed to delete registered subject");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getCourses();
    getRegCourses();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'courseCode',
        header: 'Mã môn học',
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
          error: !!validationErrors?.courseCode,
          helperText: validationErrors?.courseCode,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              courseCode: undefined,
            }),
          //readOnly: true,
        },
      },
      {
        accessorKey: 'courseName',
        header: 'Tên môn học',
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
          error: !!validationErrors?.courseName,
          helperText: validationErrors?.courseName,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              courseName: undefined,
            }),
        },
      },
      {
        accessorKey: 'classroom',
        header: 'Phòng học',
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
          error: !!validationErrors?.classroom,
          helperText: validationErrors?.classroom,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              classroom: undefined,
            }),
        },
      },
      {
        accessorKey: 'credit',
        header: 'Số lượng',
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
          error: !!validationErrors?.credit,
          helperText: validationErrors?.credit,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              credit: undefined,
            }),
        },
      },
      {
        accessorKey: 'instructorName',
        header: 'Giảng viên',
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
          error: !!validationErrors?.instructorName,
          helperText: validationErrors?.instructorName,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              instructorName: undefined,
            }),
        },
      },
      {
        accessorKey: 'scheduleDay',
        header: 'Ngày học',
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
          error: !!validationErrors?.scheduleDay,
          helperText: validationErrors?.scheduleDay,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              scheduleDay: undefined,
            }),
        },
      },
      {
        accessorKey: 'scheduleTime',
        header: 'Giờ học',
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
          error: !!validationErrors?.scheduleTime,
          helperText: validationErrors?.scheduleTime,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              scheduleTime: undefined,
            }),
        },
      },

      {
        accessorKey: 'register',
        header: 'Đăng ký môn',
        Cell: ({ row }) => (
          <Button onClick={() => handleRegister(row)}>
            Đăng ký
          </Button>
        ),
      },
    ],
    [validationErrors]
  );
  const table = useMaterialReactTable({
    columns,
    data: courses,
    getRowId: (row) => row.courseCode,
    initialState: { columnVisibility: { courseCode: true, courseName: true, classroom: true, credit: true, instructorName: true, scheduleTime: true } },
    muiTableContainerProps: {
      sx: {
        overflowX: 'auto',
        width: '100%',
      },
    }
  });

  return (
    <>
      <CourseHeader />
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#register">
        <Row style={{ marginTop: '2%' }}>
          <Col sm={2}>
            <ListGroup>
              <ListGroup.Item action href="#register">
                Đăng ký học phần
              </ListGroup.Item>
              <ListGroup.Item action href="#education">
                Chương trình đào tạo
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="#register">
                <h4>Chọn môn học đăng ký</h4>
                <MaterialReactTable style={{ minWidth: '1000px' }} table={table} />

                <h4 style={{ marginTop: '2rem' }}>Phiếu đăng ký</h4>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      {/*<th>STT</th>*/}
                      <th>Mã môn học</th>
                      <th>Tên môn học</th>
                      <th>Phòng học</th>
                      <th>Số lượng</th>
                      <th>Giảng viên</th>
                      <th>Ngày học</th>
                      <th>Giờ học</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registeredCourses.map(registeredCourse => (
                      <tr key={registeredCourse.id}>
                        {/*<td>{registeredCourse.stt}</td>*/}
                        <td>{registeredCourse.courseCode}</td>
                        <td>{registeredCourse.courseName}</td>
                        <td>{registeredCourse.classroom}</td>
                        <td>{registeredCourse.credit}</td>
                        <td>{registeredCourse.instructorName}</td>
                        <td>{registeredCourse.scheduleDay}</td>
                        <td>{registeredCourse.scheduleTime}</td>
                        <td><Button variant='danger' onClick={() => handleDelete(registeredCourse.courseCode)}>Hủy đăng ký</Button></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab.Pane>
              <Tab.Pane eventKey="#education">
                <h1>CHƯƠNG TRÌNH ĐÀO TẠO</h1>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <Footer />
    </>
  );
};

export default CourseRegistration;