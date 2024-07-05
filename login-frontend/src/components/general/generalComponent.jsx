import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'primereact/image';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { RadioButton } from 'primereact/radiobutton';
import { uploadImg } from '../API/userAPI';



export const Avatar = () => {
  const [imgSelect, setImgSelect] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [lastUpdateTime, setLastUpdateTime] = useState('');
  const user = useSelector(state => state.user?.userData);
  const currentView = useSelector(state => state.view.currentView);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.image) {
      setPreviewUrl(user.image);
    }
    if (user?.imageLastUpdate) {
      setLastUpdateTime(new Date(user.imageLastUpdate).toLocaleString());
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.files[0];
    setImgSelect(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return(
    <div className='col-3 mb-2'>
      <Image src={previewUrl || user?.image || ''} alt="avatar" height='250'  preview className='grid grid-nogutter justify-content-center'/>
        {currentView === 'EditUser' && (
          <>
            <FileUpload mode="basic" name="image" accept="image/*" onSelect={handleImageChange} className='grid grid-nogutter justify-content-center'/>
            <Button label="Upload" onClick={() => uploadImg(imgSelect, user, dispatch)} severity='success' className='grid gird-nogutter m-auto'/>
          </>
        )}
        <small className="font-bold mt-2 grid justify-content-center">Last update: {lastUpdateTime || 'Never'}</small>
    </div>
  )
};

export const DisplayMap = ({ fields, row }) => {
  const user = useSelector(state => state.user?.userData);
  return(
    <div className="grid">
      {fields.map(field => (
        <div key={field.name} className={`col-${row} mb-2`}>
          <p className="font-bold">{field.label}</p>
          <p>{field.type === "date"
            ? (user?.[field.name]?.slice(0, 10) || user?.private_info?.[field.name]?.slice(0, 10) || user?.training_info?.[field.name]?.slice(0, 10) || 'None')
            : (user?.[field.name] || user?.private_info?.[field.name] || user?.training_info?.[field.name] || 'None')}
          </p>
        </div>
      ))}
    </div>
  );
};

export const FormMap = ({ fields, formData, handleInputChange, row }) => {
  return (
    <div className="grid">
      {fields.map(field => (
        <div key={field.name} className={`col-${row} mb-2`}>
          <label htmlFor={field.name} className="font-bold block mb-2">{field.label}</label>
          {field.name === "gender" ? (
            <div className="flex flex-wrap gap-3">
              {['Male', 'Female', 'Other'].map((option) => (
                <div key={option} className="flex align-items-center">
                  <RadioButton inputId={option} name="gender" value={option[0]} onChange={handleInputChange} checked={formData?.private_info?.gender === option[0]} />
                  <label htmlFor={option} className="ml-2">{option}</label>
                </div>
              ))}
            </div>
          ) : field.type === 'date' ? (
            <Calendar id={field.name} name={field.name} placeholder="dd/mm/yyyy" className="p-inputtext-sm" value={new Date(formData?.[field.name] || formData?.private_info?.[field.name] || formData?.training_info?.[field.name] || '')} onChange={handleInputChange} />
          ) : (
            <InputText id={field.name} name={field.name} placeholder='Enter' disabled={field.name === 'userId'} className="p-inputtext-sm" value={formData?.[field.name] || formData?.private_info?.[field.name] || formData?.training_info?.[field.name] || ''} onChange={handleInputChange} />
          )}
        </div>
      ))}
    </div>
  );
};

export const CrossBar = ({content}) => {
  return(
      <div className="m-auto bg-gray-200 font-bold w-11 shadow-4">
        <p>{content}</p>
      </div>
  )
};
