import React, { useMemo, useState, useEffect } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import IconButton from '@mui/material/IconButton';
import { Button, Modal, Form } from 'react-bootstrap';
import { getAllCourses, getCourse, handleAdd, handleUpdate, handleDelete } from '../../API/admin/createCourse';
import { getAllUser } from '../../API/admin/adminAPI';

function ListStudent() {
  const [validationErrors, setValidationErrors] = useState({});
  const [instructors, setInstructors] = useState([]); 
  const [courses, setCourses] = useState([{
  }]);
  const [update, setUpdate] = useState({
    courseCode: '',
    courseName: '',
    classroom: '',
    credit: '',
    instructorName: '',
    userId: '',
    scheduleDay: '',
    scheduleTime: '',
    scheduleWeek: '',
  })
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  
  useEffect(() => {
    const getData = async () => {
      getAllCourses(setCourses);
      const teachers = await getAllUser('teacher');
      const objects= teachers.map(instructor => {
        return {name: instructor.name, userId: instructor.userId};});
      setInstructors(objects);
    }
    getData();
  }, []);

  const handleShowModal = (data) => {
    setUpdate(data ?? {
      courseCode: '',
      courseName: '',
      classroom: '',
      credit: '',
      instructorName: '',
      userId: '',
      scheduleDay: '',
      scheduleTime: '',
      scheduleWeek: '',
    });
    setModalMode(data ? "update" : "add");
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setModalMode("add");
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
        <a onClick={async () => {const result = await getCourse(row); handleShowModal(result)}}>
            <IconButton>
              <svg width="23" height="26" viewBox="0 0 23 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.3757 2.02007C16.0264 1.30193 16.9002 0.883741 17.82 0.850314C18.7398 0.816888 19.6366 1.17073 20.3287 1.84007L20.5027 2.02007L21.357 2.96273C22.0075 3.68063 22.3862 4.64457 22.4165 5.65918C22.4468 6.67379 22.1264 7.66315 21.5201 8.42673L21.357 8.61873L7.80916 23.5694C7.61761 23.7808 7.38556 23.942 7.13008 24.0414L6.93433 24.1041L1.55241 25.4747C1.36387 25.5228 1.16763 25.5203 0.98016 25.4673C0.792694 25.4144 0.619477 25.3125 0.475054 25.1704C0.330632 25.0283 0.219219 24.85 0.150173 24.6506C0.0811261 24.4511 0.0564605 24.2362 0.0782473 24.0241L0.102414 23.8734L1.34337 17.9334C1.40468 17.6421 1.52442 17.3696 1.69379 17.1361L1.82791 16.9694L15.3757 2.02007ZM14.5215 6.7334L3.65854 18.7201L2.89004 22.3974L6.22262 21.5481L17.0855 9.5614L14.5215 6.7334ZM18.7941 3.9054C18.5861 3.67583 18.3092 3.53792 18.0156 3.51755C17.7219 3.49717 17.4316 3.59573 17.1991 3.79473L17.0855 3.9054L16.23 4.84807L18.7941 7.67606L19.6484 6.7334C19.8565 6.50381 19.9814 6.19834 19.9999 5.87431C20.0184 5.55027 19.929 5.22994 19.7487 4.9734L19.6484 4.84807L18.7941 3.9054Z" fill="black" />
              </svg>
            </IconButton>
        </a>
    )}, {
      accessorKey: 'delete',
      header: 'Delete',
      Cell: ({ row }) => (
        <IconButton onClick={() => handleDelete(row, setCourses)}>
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
      <Button style={{ marginLeft: '85%', backgroundColor: '#20bd20', borderColor: 'green' }} onClick={()=> handleShowModal(null) }>Add course</Button>
    </div>
    <MaterialReactTable style={{ minWidth: '80vh' }} table={table} />

    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {modalMode === "add" ? "Add course..." : "Update Course..."}
        </Modal.Title>
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
                value={update.scheduleTime}
                onChange={(e) => setUpdate({...update,scheduleTime: e.target.value})}
              />
            </Form.Group>
            <Form.Group controlId="formWeek">
              <Form.Label>Schedule Week</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter"
                value={update.scheduleWeek}
                onChange={(e) => setUpdate({...update,scheduleWeek: e.target.value})}
              />
            </Form.Group>
            <Form.Group controlId="formInstructorName">
              <Form.Label>Instructor Name</Form.Label>
              <Form.Select
                value={update?.userId}
                onChange={(e) => {
                  const object = instructors.find((instructor) => instructor?.userId === e.target.value);
                  setUpdate({...update,
                    userId: object?.userId,
                    instructorName: object?.name
                  })
                }}>
                <option value="UNDEFINE">Choose Teacher</option>
                {instructors.map((teacher) => (
                  <option value={teacher?.userId}>{teacher?.name} - GV{teacher?.userId}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleCloseModal()}>
          Close
        </Button>
        <Button variant="primary" onClick={async () => {
          if (modalMode === "add") {
            await handleAdd(update, setCourses);
          } else if (modalMode === "update") {
            await handleUpdate(update, setCourses);
          }
          console.log(update);
          handleCloseModal();
        }}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
};
export default ListStudent;
