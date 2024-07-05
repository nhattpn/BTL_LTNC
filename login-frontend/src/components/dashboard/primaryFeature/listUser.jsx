import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { getAllUser, getData, handleAdd, handleDelete } from '../../API/admin/adminAPI';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../store/feature/userReducer';
import { setCurrentView } from '../../../store/feature/viewReducer';

function ListUser({type}) {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const dt = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllUser(type);
        setUsers(result);
      } catch (err) {
        console.log("Error fetching listusers");
      } 
    };
    fetchData();
  }, [type]);

  const handleEdit = async (row) => {
    const data = await getData(type, row);
    dispatch(setUserData(data));
    dispatch(setCurrentView(`EditUser`)); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => handleEdit(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => handleDelete(type, rowData, setUsers)} />
      </>
    );
  };

  const footer = (
    <div>
      <Button label="Close" icon="pi pi-times" onClick={handleCloseModal} className="p-button-text" />
      <Button label="Confirm" icon="pi pi-check" onClick={() => {
        handleAdd(type, name, email, password, setUsers);
        handleCloseModal();
      }} autoFocus />
    </div>
  );

  return (
    <>
      <div className="navigation">
        <h2 style={{ padding: '1vh' }}>
          {type.toUpperCase()} INFORMATION
        </h2>
      </div>
      <hr style={{ borderTop: '1px solid' }} />

      <div className='mb-3' style={{ backgroundColor: '#f2f2f2', padding: '10px' }}>
        <Button label={`Add ${type}`} icon="pi pi-plus" onClick={handleShowModal} style={{ marginLeft: '85%' }} />
      </div>

      <DataTable ref={dt} value={users} >
        {
          type !== 'admin' ?
        <Column field="userId" header="User ID" sortable /> : null
        }
        <Column field="name" header="Full Name" sortable />
        <Column field="email" header="Email" sortable />
        <Column field="password" header="Password" sortable />
        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }} />
      </DataTable>

      <Dialog header={`Add ${type}...`} visible={showModal} style={{ width: '50vw' }} footer={footer} onHide={handleCloseModal}>
        <div className="p-field">
          <label htmlFor="name">Name</label>
          <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="p-field">
          <label htmlFor="email">Email</label>
          <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        {
          type === 'admin' ? <div className="p-field">
            <label htmlFor="password">Password</label>
            <InputText id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div> : null
        }
      </Dialog>
    </>
  );
}

export default ListUser;
