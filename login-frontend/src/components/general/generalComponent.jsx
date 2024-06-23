import { Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import React from 'react';


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
        <p>{field.type === "date"
          ? (user?.[field.name]?.slice(0, 10)
          || user?.private_info?.[field.name]?.slice(0, 10)
          || user?.training_info?.[field.name]?.slice(0, 10)
          || 'None')
          : (user?.[field.name]
          || user?.private_info?.[field.name]
          || user?.training_info?.[field.name] 
          || 'None')}</p>
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
            value={field.type === 'date'
              ? (formData?.[field.name]?.slice(0, 10)
              || formData?.private_info?.[field.name]?.slice(0, 10)
              || formData?.training_info?.[field.name]?.slice(0, 10)
              || '')
              : (formData?.[field.name] 
              || formData?.private_info?.[field.name]
              || formData?.training_info?.[field.name]
              || '')
            }
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
