import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import CourseHeader from '../../components/header_footer/CourseHeader';
import Footer from '../../components/header_footer/Footer';
import { courseIMG } from '../../components/image';

function MyCourse() {

  const header =  (<img src={courseIMG} alt="Course Image" style={{width: '100%', height: '100%'}} />);
  const footer = (<div >
    <Button label='View Detail' style={{width: '100%'}} severity='info'/>
  </div>);

  const [mycourses, setMycourses] = useState([
    {
      'courseCode': 'COxxxx',
      'semester': '1',
      'credit': '50',
      'instructorName': 'Tên giảng viên',
      'userId': '1234567',
    }
  ])
  
  const jwtToken = sessionStorage.getItem('jwtToken');
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/student/dashboard/course", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const result = await response.json();
        setMycourses(result);
      }
      else {
        console.error("Failed to get my course");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <CourseHeader />
      <div style={{ margin: '5% 10%' }}>
        <div style={{ marginBottom: '2%' }}>
          <h2 style={{ color: '#eba234', fontWeight: 'bold' }}>My Course</h2>
        </div>
        <Row xs={1} md={4} className="g-4">
          {mycourses.map((course) => (
            <Col key={course.courseCode}>
              <Card 
                  header={header}
                  footer={footer}
                  title={course.courseName} 
                  subTitle={course.courseCode}
              >
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
    </>
  );
}

export default MyCourse;
