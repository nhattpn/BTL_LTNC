import { useMemo, useState, useEffect } from 'react';
import { Table, Button, Row, Col, Tab, ListGroup } from 'react-bootstrap';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

import { getAllCourses, getRegCourses, handleRegister, handleDelete, handleDeleteAll, handleEnroll } from '../../components/API/courseAPI';

import CourseHeader from '../../components/header_footer/CourseHeader';
import Footer from '../../components/header_footer/Footer';

const CourseRegistration = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [courses, setCourses] = useState([{}]);
  const [registeredCourses, setRegisteredCourses] = useState([
    {
      'stt': '',
      'courseCode': '',
      'courseName': '',
      'credit': '',
      'classroom': '',
      'enrollment': '',
      'instructorName': '',
      'scheduleDay': '',
      'scheduleTime': '',
    }
  ]);

  useEffect(() => {
    getAllCourses(setCourses);
    getRegCourses(setRegisteredCourses);
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'courseCode',
        header: 'Course Code',
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
      }, {
        accessorKey: 'courseName',
        header: 'Course Name',
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
      }, {
        accessorKey: 'classroom',
        header: 'Classroom',
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
      }, {
        accessorKey: 'credit',
        header: 'Credit',
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
      }, {
        accessorKey: 'instructorName',
        header: 'Instructor Name',
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
      }, {
        accessorKey: 'scheduleDay',
        header: 'Schedule Day',
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
      }, {
        accessorKey: 'scheduleTime',
        header: 'Schedule Time',
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
      }, {
        accessorKey: 'register',
        header: '',
        Cell: ({ row }) => (
          <Button onClick={() => handleRegister(row, registeredCourses, setRegisteredCourses)}>
            Register
          </Button>
        ),
      },
    ],
    [validationErrors, registeredCourses]
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
                Register Form
              </ListGroup.Item>
              <ListGroup.Item action href="#education">
                Training Program
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="#register">
                <h3 style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>Choose your subject</h3>
                <MaterialReactTable style={{ minWidth: '80vh' }} table={table} />

                <h3 style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>Registered Course</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Course Name</th>
                      <th>Credit</th>
                      <th>Classroom</th>
                      <th>Enrollment</th>
                      <th>Instructor Name</th>
                      <th>Schedule Day</th>
                      <th>Schedule Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registeredCourses.map(registeredCourse => (
                      <tr key={registeredCourse.id}>
                        <td>{registeredCourse.courseCode}</td>
                        <td>{registeredCourse.courseName}</td>
                        <td>{registeredCourse.credit}</td>
                        <td>{registeredCourse.classroom}</td>
                        <td>{registeredCourse.enrollment}</td>
                        <td>{registeredCourse.instructorName}</td>
                        <td>{registeredCourse.scheduleDay}</td>
                        <td>{registeredCourse.scheduleTime}</td>
                        <td><Button variant='danger' onClick={() => handleDelete(registeredCourse.courseCode, setRegisteredCourses)}>Cancel Registrattion</Button></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              <div style={{ display: 'flex', justifyContent: 'center' , margin: '1rem'}}>
                <Button onClick={() => handleEnroll()} style={{ marginLeft: '35rem' }} variant='outline-success'>Comfirm Register</Button>
                <Button onClick={() => handleDeleteAll(setRegisteredCourses)} style={{ marginLeft: '25rem' }} variant='warning'>Cancel All Registration</Button>
              </div>
              </Tab.Pane>
              <Tab.Pane eventKey="#education">
                <h1>TRAINING EDUCATION</h1>
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