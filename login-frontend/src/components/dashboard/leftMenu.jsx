import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentView } from '../../store/feature/viewReducer';
import { PanelMenu } from 'primereact/panelmenu';

function LeftMenu({ role }) {
    const dispatch = useDispatch();

    const AdminMenu = [
        {
            label: 'User Information',
            icon: 'pi pi-fw pi-users',
            items: [
                { label: 'Student', icon: 'pi pi-fw pi-user', command: () => { dispatch(setCurrentView('ListStudent')) } },
                { label: 'Teacher', icon: 'pi pi-fw pi-user', command: () => { dispatch(setCurrentView('ListTeacher')) } },
            ]
        },
        { label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', command: () => { dispatch(setCurrentView('DashBoard')) } },
        { label: 'Admin', icon: 'pi pi-fw pi-cog', command: () => { dispatch(setCurrentView('ListAdmin')) } },
    ];

    const TeacherMenu = [
        { label: 'Personal', icon: 'pi pi-fw pi-user', command: () => { dispatch(setCurrentView('InfoUser')) } },
        { label: 'Schedule', icon: 'pi pi-fw pi-calendar', command: () => { dispatch(setCurrentView('Schedule')) } },
    ];

    const StudentMenu = [
        { label: 'Personal', icon: 'pi pi-fw pi-user', command: () => { dispatch(setCurrentView('InfoUser')) } },
        {
            label: 'Course',
            icon: 'pi pi-fw pi-book',
            url: '/student/course',
            target: '_blank' 
        },
        { label: 'Schedule', icon: 'pi pi-fw pi-calendar', command: () => { dispatch(setCurrentView('Schedule')) } },
    ];
  

    const menuModel = role === 'admin' ? AdminMenu : role === 'teacher' ? TeacherMenu : StudentMenu;

    return (
        <>
            <PanelMenu model={menuModel} className="w-full md:w-18rem" />
        </>
    );
}

export default LeftMenu;

