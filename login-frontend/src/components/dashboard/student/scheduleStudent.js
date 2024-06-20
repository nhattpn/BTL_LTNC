import { useEffect, useState } from "react";
import { ViewContext } from '../../../pages/dashboardPage/StudentDashboard';

function Schedule(){
    const [schedule, setSchedule] = useState({});
    const jwtToken = sessionStorage.getItem('jwtToken');
    // useEffect(()=>{
    //     setSchedule();
    // }, [schedule]);
    const getData = async (row) => {
        let id = row.original.userId;
        try {
        const response = await fetch(`http://localhost:5000/student/dashboard/tkb`, {
            method: "GET",
            headers: {
            Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
            "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const result = await response.json();
            setSchedule(result);
        }
        else {
            console.error("Failed to get schedule");
        }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return(
        <>
            
        </>
    )
}
export default Schedule;