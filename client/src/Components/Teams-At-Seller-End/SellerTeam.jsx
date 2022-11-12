import React, { useState } from 'react'
import './seller.css'
import { BsTrash } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { FaMinus, FaPlus } from 'react-icons/fa';
import SellerNavBar from '../navbars/sellerNavbar';
const SellerTeam = () => {
    const [file, setFile] = useState(null)
    const [teamTitle, setTeamTitle] = useState('Team Title')
    const [teamLeader, setTeamLeader] = useState('Philip Trevor')
    const [mode, setMode] = useState(false);
    const [inputFields, setInputFields] = useState([
      { id: uuidv4(), memberName: 'Ali', responsibility: 'CEO' },
      { id: uuidv4(), memberName: 'Raza', responsibility: 'Manager' },
    ]);
    const handleSubmit = (e) => {
        e.preventDefault();
        setMode(false);
      };
    
      const handleChangeInput = (id, event) => {
        const newInputFields = inputFields.map(i => {
          if (id === i.id) {
            i[event.target.name] = event.target.value
          }
          return i;
        })
    
        setInputFields(newInputFields);
      }
    
      const handleAddFields = () => {
        setInputFields([...inputFields, { id: uuidv4(), memberName: '', responsibility: '' }])
      }
    
      const handleRemoveFields = id => {
        const values = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
      }
      const handleEdit = () => {
        setMode(true);
      }
      const handleDelete = () => {
        alert("Deleted");
        setMode(false);
      }
      const teamTitleChange = (e) => {
        setTeamTitle(e.target.value)
      }
      const teamLeaderChange = (e) => {
        setTeamLeader(e.target.value)
      }
    return (
        <>
        <SellerNavBar/>
             <div className="customContainer">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="row">
              <div className="col-md-5 roundIm">
                {file ? (
                  <img src={URL.createObjectURL(file)} alt="Team Logo" />
                ) : (<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASsAAACoCAMAAACPKThEAAAAA1BMVEUAAP79f+LBAAAASElEQVR4nO3BMQEAAADCoPVPbQo/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICXAcTgAAG6EJuyAAAAAElFTkSuQmCC" alt="img" />)}
              </div>
              <div className="col-md-7 teamInfo">
                {mode ? (
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">Team Title</label>
                    <input type="text" value={teamTitle} onChange={teamTitleChange} className="form-control" required />
                  </div>
                ) : (<div className='teamTitle'>{teamTitle}</div>)}
                {!mode && <div className='name'>Team Leader</div>}
                {mode ? (
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Team Leader</label>
                    <input type="text" value={teamLeader} onChange={teamLeaderChange} className="form-control" required />
                  </div>
                ) : (<div className='teamLead'>{teamLeader}</div>)}
                {mode && <div className='col-md-6'>
                  <label className="form-label">Image</label>
                  <input className="form-control" onChange={(e) => setFile(e.target.files[0])} type="file" id="file" /></div>}
              </div>
            </div>
          </div>
          <div className="col-md-6 customPadding">
            <div className="row members">
              {mode ? (
                <div className='container'>
                  <form onSubmit={handleSubmit}>
                    {inputFields.map(inputField => (
                      <div className='row' key={inputField.id}>
                        <div className="col-md-3 mb-3">
                          <label className="form-label">Member Name</label>
                          <input type="text" value={inputField.memberName} onChange={event => handleChangeInput(inputField.id, event)} name="memberName" className="form-control" placeholder="Ali Raza" required />
                        </div>
                        <div className="col-md-3 mb-3">
                          <label className="form-label">Responsinility</label>
                          <input type="text" value={inputField.responsibility} onChange={event => handleChangeInput(inputField.id, event)} name="responsibility" className="form-control" placeholder="Manager" required />
                        </div>

                        <span className='btns col-md-3'>
                          <button className='btn' disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                            <FaMinus />
                          </button>
                          <button className='btn' onClick={handleAddFields}>
                            <FaPlus />
                          </button>
                        </span>
                      </div>
                    ))}
                    <div className="row">
                      <div className="col-md-4 col-6">
                        <button className='btn btn-outline-primary' onClick={handleSubmit} >Update</button>
                      </div>
                      <div className="col-md-6 col-6"><BsTrash onClick={handleDelete} className='ic' color='#025EE5' size={50} /></div>

                    </div>
                  </form>
                </div>
              ) : (
                <>
                  {inputFields.map(inputField => (
                    <>
                      <div className="col-md-6 col-6 my-3"><div className='customBorder'>{inputField.memberName}</div></div>
                      <div className="col-md-6 col-6 my-3"><div className='customBorder'>{inputField.responsibility}</div></div>
                    </>
                  ))}
                </>
              )}

            </div>
            <div className="container">
              <div className="row">
                {!mode && (<><div className="col-md-6 col-6" style={{ textAlign: "center" }}><FaEdit onClick={handleEdit} className='ic' color='#025EE5' size={50} /></div>
                  <div className="col-md-6 col-6"><BsTrash onClick={handleDelete} className='ic' color='#025EE5' size={50} /></div>
                </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
    );
}
 
export default SellerTeam;