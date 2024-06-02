import React, { useMemo, useState, useEffect, useRef, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ViewContext } from '../../../pages/dashboardPage/AdminDashboard';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import IconButton from '@mui/material/IconButton';
import { Button, Modal, Form } from 'react-bootstrap';

function ListStudent() {
  const [validationErrors, setValidationErrors] = useState({});
  const [courses, setCourses] = useState([{
  }]);
  const [update, setUpdate] = useState({
    courseCode: '',
    courseName: '',
    classroom: '',
    credit: '',
    instructorName: '',
    scheduleDay: '',
    scheduleTime: '',
  })
  const [showModal, setShowModal] = useState(false);
  
  // Lấy JWT từ Session Storage
  const jwtToken = sessionStorage.getItem('jwtToken');
  // Gửi yêu cầu GET với JWT trong header
  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = async () => {
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
        setUpdate(result);
        handleShowModal();
      }
      else {
        console.error(result?.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAdd = async () => {
    console.log({update});
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
        getAllCourses();
        handleCloseModal();
      }
      else {
        alert(result?.message || "Error");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleDelete = async (row) => {
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
          getAllCourses();
      }
      else {
        alert(result?.message || "Error");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const columns = useMemo( () => [ 
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
      accessorKey: 'edit',
      header: 'Edit',
      Cell: ({ row }) => (
        <a onClick={(e) => {getCourse(row);}}>
            <IconButton>
              <svg width="23" height="26" viewBox="0 0 23 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.3757 2.02007C16.0264 1.30193 16.9002 0.883741 17.82 0.850314C18.7398 0.816888 19.6366 1.17073 20.3287 1.84007L20.5027 2.02007L21.357 2.96273C22.0075 3.68063 22.3862 4.64457 22.4165 5.65918C22.4468 6.67379 22.1264 7.66315 21.5201 8.42673L21.357 8.61873L7.80916 23.5694C7.61761 23.7808 7.38556 23.942 7.13008 24.0414L6.93433 24.1041L1.55241 25.4747C1.36387 25.5228 1.16763 25.5203 0.98016 25.4673C0.792694 25.4144 0.619477 25.3125 0.475054 25.1704C0.330632 25.0283 0.219219 24.85 0.150173 24.6506C0.0811261 24.4511 0.0564605 24.2362 0.0782473 24.0241L0.102414 23.8734L1.34337 17.9334C1.40468 17.6421 1.52442 17.3696 1.69379 17.1361L1.82791 16.9694L15.3757 2.02007ZM14.5215 6.7334L3.65854 18.7201L2.89004 22.3974L6.22262 21.5481L17.0855 9.5614L14.5215 6.7334ZM18.7941 3.9054C18.5861 3.67583 18.3092 3.53792 18.0156 3.51755C17.7219 3.49717 17.4316 3.59573 17.1991 3.79473L17.0855 3.9054L16.23 4.84807L18.7941 7.67606L19.6484 6.7334C19.8565 6.50381 19.9814 6.19834 19.9999 5.87431C20.0184 5.55027 19.929 5.22994 19.7487 4.9734L19.6484 4.84807L18.7941 3.9054Z" fill="black" />
              </svg>
            </IconButton>
        </a>
          // onSave={ async () => {
          //   const updatedCourse = row.original; // Lấy dữ liệu đã chỉnh sửa
            // try {
            //   const response = await fetch(`http://localhost:5000/student/dashboard/dangkimon/${updatedCourse._id}`, {
            //     method: 'PUT',
            //     headers: {
            //         Authorization: `Bearer ${jwtToken}`,
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(updatedCourse), // Gửi dữ liệu đã chỉnh sửa dưới dạng JSON
            //   });

            //   if (response.status === 200) {
            //     getAllCourses(); // Cập nhật lại danh sách sau khi chỉnh sửa thành công
            //     setIsEditing({ ...isEditing, [row.id]: false }); // Tắt chỉnh sửa
            //   } else {
            //     console.error("Failed to update course");
            //   }
            // } catch (error) {
            //   console.error('Error updating course:', error);
            // }
          // }}
    )}, {
      accessorKey: 'delete',
      header: 'Delete',
      Cell: ({ row }) => (
        <IconButton onClick={() => handleDelete(row)}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="23" height="26" viewBox="0 0 48 48">
            <path fill="#F44336" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"></path><path fill="#F44336" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"></path>
          </svg>
        </IconButton>
      )
    }],
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
  return (<>
    <h1 style={{textAlign: 'center'}}>SUBJECT LIST</h1>
    <div className='mb-3' style={{ backgroundColor: '#f2f2f2', padding: '10px' }}>
      <Button style={{ marginLeft: '85%', backgroundColor: '#20bd20', borderColor: 'green' }} onClick={() => handleShowModal()}>Add course</Button>
    </div>
    <MaterialReactTable style={{ minWidth: '80vh' }} table={table} />

    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add course...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row'>
          <div className='col-md-6'>
            <Form>
              <Form.Group controlId="formCode">
                <Form.Label>Course Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter"
                  value={update.courseCode}
                  onChange={(e) => setUpdate({...update, courseCode: e.target.value})}
                />
              </Form.Group>
              <Form.Group controlId="formName">
                <Form.Label>Course Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter"
                  value={update.courseName}
                  onChange={(e) => setUpdate({...update, courseName: e.target.value})}
                />
              </Form.Group>
              <Form.Group controlId="formClassroom">
                <Form.Label>Classroom</Form.Label>
                <Form.Select
                    value={update.classroom || ""}
                    onChange={(e) => setUpdate({...update,classroom: e.target.value})}>
                  <option value="$$-$$$">Choose Room</option>
                  <option value="H1-101">H1-101</option>
                  <option value="H1-102">H1-102</option>
                  <option value="H2-201">H2-201</option>
                  <option value="H2-202">H2-202</option>
                  <option value="H3-301">H3-301</option>
                  <option value="H3-302">H3-302</option>
                  <option value="H6-601">H6-601</option>
                  <option value="H6-602">H6-602</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formCredit">
                <Form.Label>Credit</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0"
                  value={update.credit ?? 0}
                  min={0}
                  max={6}
                  onChange={(e) => {
                    const newValue = Math.max(0, Math.min(6, parseInt(e.target.value, 10) || 0));
                    setUpdate({ ...update, credit: newValue });
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formInstructorName">
                <Form.Label>Instructor Name</Form.Label>
                <Form.Select
                  value={courses.instructorName}
                  onChange={(e) => setUpdate({...update,instructorName: e.target.value})}>
                  <option value="UNDEFINE">Choose Teacher</option>
                  <option value="John">John</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </div>
          <div className='col-md-6'>
            <Form.Group controlId="formDay">
              <Form.Label>Schedule Day</Form.Label>
              <Form.Select 
                  value={update.scheduleDay || ""} 
                  onChange={(e) => setUpdate({...update, scheduleDay: e.target.value})}>
                <option value="">Choose Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </Form.Select>
            </Form.Group> 
            <Form.Group controlId="formTime">
              <Form.Label>Schedule Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter"
                value={courses.scheduleTime}
                onChange={(e) => setUpdate({...update,scheduleTime: e.target.value})}
              />
            </Form.Group>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAdd}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
};
export default ListStudent;