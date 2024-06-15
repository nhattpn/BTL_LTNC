import { Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const Avatar = () => {
  return(
    <Col sm={3}>
      <div style={{ textAlign: 'center' }}>
        <img src={''} alt="avatar" style={{ padding: '3vh', backgroundColor: 'rgb(204, 203, 203)' }} />
      </div>
      <div style={{ textAlign: 'center', marginBottom: '0'}}>
        <b style={{ textAlign: 'center' }}>
          Last profile photo update time: ___
        </b>
      </div>
    </Col>
  )
};

export const DisplayMap = ({ fields, row }) => {
  const user = useSelector(state => state.user?.userData);
  return(
    <Row style={{marginBottom: '2%'}}>
      {fields.map(field => (
      <Col sm={row} key={field.name} style={{ padding: '0 1vh', marginBottom: '1%'}}>
        <p style={{ fontWeight: 'bold' }}>{field.label}</p>
        <p>{user?.[field.name]
          || user?.private_info?.[field.name]
          || user?.training_info?.[field.name] 
          || 'None'}</p>
      </Col>
      ))}
    </Row>
  );
};

export const FormMap = ({ fields, formData, handleInputChange, row }) => {
  return (
    <Row style={{marginBottom: '2%'}}>
      {fields.map(field => (
      <Col sm={row} key={field.name} style={{ padding: '0 2vh', borderLeft:'1px solid rgb(204, 203, 203)', marginBottom: '1%'}}>
        <Form.Group as={Row} controlId={`form${field.name.charAt(0).toUpperCase() + field.name.slice(1)}`}>
          <Form.Label><b>{field.label}</b></Form.Label>
          {field.name === "gender" ? (
              <>
                <Col >
                  <Form.Check
                    type="radio"
                    label="Male"
                    name="gender"
                    value="M"
                    checked={formData?.private_info?.gender === 'M'} // Giả sử gender nằm trong private_info
                    onChange={handleInputChange}
                  />
                </Col>
                <Col >
                  <Form.Check
                    type="radio"
                    label="Female"
                    name="gender"
                    value="F"
                    checked={formData?.private_info?.gender === 'F'}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col >
                  <Form.Check
                    type="radio"
                    label="Other"
                    name="gender"
                    value="O"
                    checked={formData?.private_info?.gender === 'O'}
                    onChange={handleInputChange}
                  />
                </Col>
              </>
            ) : (
          <Form.Control
            type={field.type}
            placeholder="Enter"
            name={field.name}
            value={formData?.[field.name]
              || formData?.private_info?.[field.name]
              || formData?.training_info?.[field.name]
              || ''}
            onChange={handleInputChange}
          />
          )}
        </Form.Group>
      </Col>
      ))}
    </Row>
  );
};

export const CrossBar = ({content}) => {
  return(
    <div style={{ backgroundColor: 'rgb(204, 203, 203)', fontWeight: 'bold', width: '96%', margin: 'auto'}}>
      <p style={{ boxShadow: '2px 2px 10px rgb(104, 103, 103)' }}>
        {content}
      </p>
    </div>
  )
};

export const handleSubmit = async (e, userType, formData, dispatch, setUserData) => {
  e.preventDefault();
  const jwtToken = sessionStorage.getItem('jwtToken');
  try {
    const response = await fetch(`http://localhost:5000/${userType}/dashboard/${userType}info`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Sử dụng dữ liệu từ Redux store
    });

    if (response.ok) {

      dispatch(setUserData(formData));
      alert('Update successfully.');
    } else {
      console.error('Failed to update student');
      alert('Failed to update student!');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};