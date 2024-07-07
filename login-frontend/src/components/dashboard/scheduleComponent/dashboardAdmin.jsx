import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { getAllCourses, handleAdd, handleUpdate, handleDelete } from '../../API/admin/createCourse';
import { getAllUser } from '../../API/admin/adminAPI';

function ListStudent() {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
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
  });

  const dt = useRef(null);

  useEffect(() => {
    const getData = async () => {
      getAllCourses(setCourses);
      const teachers = await getAllUser('teacher');
      const objects = teachers.map(instructor => ({
        name: instructor.name,
        userId: instructor.userId
      }));
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

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => handleShowModal(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => handleDelete(rowData, setCourses)} />
      </>
    );
  };

  const footer = (
    <div>
      <Button label="Close" icon="pi pi-times" onClick={handleCloseModal} className="p-button-text" />
      <Button label="Confirm" icon="pi pi-check" onClick={async () => {
        if (modalMode === "add") {
          await handleAdd(update, setCourses);
        } else if (modalMode === "update") {
          await handleUpdate(update, setCourses);
        }
        handleCloseModal();
      }} autoFocus />
    </div>
  );

  return (
    <>
      <h1 style={{textAlign: 'center'}}>SUBJECT LIST</h1>
      <div className='mb-3' style={{ backgroundColor: '#f2f2f2', padding: '10px' }}>
        <Button label="Add course" icon="pi pi-plus" onClick={() => handleShowModal(null)} style={{ marginLeft: '85%' }} />
      </div>
      <DataTable ref={dt} value={courses} >
        <Column field="courseCode" header="Course Code" sortable />
        <Column field="courseName" header="Course Name" sortable />
        <Column field="classroom" header="Classroom" sortable />
        <Column field="credit" header="Credit" sortable />
        <Column field="instructorName" header="Instructor Name" sortable />
        <Column field="scheduleDay" header="Schedule Day" sortable />
        <Column field="scheduleTime" header="Schedule Time" sortable />
        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }} />
      </DataTable>

      <Dialog header={modalMode === "add" ? "Add course..." : "Update Course..."} visible={showModal} style={{ width: '50vw' }} footer={footer} onHide={handleCloseModal}>
        <div className='grid'>
          <div className='col-6'>
            <div className="p-field">
              <label htmlFor="courseCode">Course Code</label>
              <InputText id="courseCode" value={update.courseCode} onChange={(e) => setUpdate({...update, courseCode: e.target.value})} />
            </div>
            <div className="p-field">
              <label htmlFor="courseName">Course Name</label>
              <InputText id="courseName" value={update.courseName} onChange={(e) => setUpdate({...update, courseName: e.target.value})} />
            </div>
            <div className="p-field">
              <label htmlFor="classroom">Classroom</label>
              <Dropdown id="classroom" value={update.classroom} options={[
                {label: 'Choose Room', value: ''},
                {label: 'H1-101', value: 'H1-101'},
                {label: 'H1-102', value: 'H1-102'},
                {label: 'H2-201', value: 'H2-201'},
                {label: 'H2-202', value: 'H2-202'},
                {label: 'H3-301', value: 'H3-301'},
                {label: 'H3-302', value: 'H3-302'},
                {label: 'H6-601', value: 'H6-601'},
                {label: 'H6-602', value: 'H6-602'},
              ]} onChange={(e) => setUpdate({...update, classroom: e.value})} placeholder="Select a Classroom" />
            </div>
            <div className="p-field">
              <label htmlFor="credit">Credit</label>
              <InputNumber id="credit" value={update.credit} onValueChange={(e) => setUpdate({...update, credit: e.value})} min={0} max={6} />
            </div>
          </div>
          <div className='col-6'>
            <div className="p-field">
              <label htmlFor="scheduleDay">Schedule Day</label>
              <Dropdown id="scheduleDay" value={update.scheduleDay} options={[
                {label: 'Choose Day', value: ''},
                {label: 'Monday', value: 'Monday'},
                {label: 'Tuesday', value: 'Tuesday'},
                {label: 'Wednesday', value: 'Wednesday'},
                {label: 'Thursday', value: 'Thursday'},
                {label: 'Friday', value: 'Friday'},
                {label: 'Saturday', value: 'Saturday'},
                {label: 'Sunday', value: 'Sunday'},
              ]} onChange={(e) => setUpdate({...update, scheduleDay: e.value})} placeholder="Select a Day" />
            </div>
            <div className="p-field">
              <label htmlFor="scheduleTime">Schedule Time</label>
              <InputText id="scheduleTime" value={update.scheduleTime} onChange={(e) => setUpdate({...update, scheduleTime: e.target.value})} />
            </div>
            <div className="p-field">
              <label htmlFor="scheduleWeek">Schedule Week</label>
              <InputText id="scheduleWeek" value={update.scheduleWeek} onChange={(e) => setUpdate({...update, scheduleWeek: e.target.value})} />
            </div>
            <div className="p-field">
              <label htmlFor="instructorName">Instructor Name</label>
              <Dropdown id="instructorName" value={update.userId} options={instructors.map(instructor => ({
                label: `${instructor.name} - GV${instructor.userId}`,
                value: instructor.userId
              }))} onChange={(e) => {
                const selectedInstructor = instructors.find(instructor => instructor.userId === e.value);
                setUpdate({...update, userId: e.value, instructorName: selectedInstructor?.name})
              }} placeholder="Choose Teacher" />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default ListStudent;