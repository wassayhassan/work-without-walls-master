import React, { useState, useEffect } from 'react'
import './seller.css'
import { BsTrash } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { FaMinus, FaPlus } from 'react-icons/fa';
import SellerNavBar from '../navbars/sellerNavbar';
import { useParams, useNavigate } from "react-router-dom";
import { getTeamById } from "../../api";
import { updateTeam, deleteTeamById } from "../../api";

const SellerTeam = () => {
    const [file, setFile] = useState(null)

    const [mode, setMode] = useState(false);
    const [teamData, setTeamData] = useState({});
    const [membersData, setMembersData] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();
    async function getTeamData(id){
       const response = await getTeamById(id);
       if(response.status === 200){
          setMembersData(response.data.teamMembers);
          setTeamData(response.data);
       }
    }
    console.log(teamData)
  
    useEffect(()=> {
      getTeamData(id);
    }, [id])


      const handleUpdateTeam = async() => {
        let data = new FormData();
          data.append('title', teamData.title);
          data.append('leaderName', teamData.leaderName);
          membersData.forEach((mem)=> {
            data.append('teamMembers', JSON.stringify(mem));
          })

        data.append('logo', file);
        const response = await updateTeam(id, data);
        setMode(false);
      }
    
    
      const handleAddFields = () => {
        // setInputFields([...inputFields, { id: uuidv4(), memberName: '', responsibility: '' }])
      }
    
      const handleRemoveFields = id => {
        // const values = [...inputFields];
        // values.splice(values.findIndex(value => value.id === id), 1);
        // setInputFields(values);
      }
      const handleMembersChange = (e) => {
        let id = e.target.id;
        let name = e.target.name;
        let value = e.target.value;
        console.log(membersData)
        setMembersData(membersData.map((mem)=> parseInt(mem.id) === parseInt(id)? {...mem, [name]: value}: mem))
       }
       const handleDataChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setTeamData({...teamData, [name]: value});
        console.log(teamData)
       }

      const handleEdit = () => {
        setMode(true);
      }
      const handleDelete = async() => {
         const data = await deleteTeamById(id);
        setMode(false);
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
                ) : (<img src={teamData.logo} alt="img" />)}
              </div>
              <div className="col-md-7 teamInfo">
                {mode ? (
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">Team Title</label>
                    <input type="text" name='title' value={teamData.title} onChange={handleDataChange} className="form-control" required />
                  </div>
                ) : (<div className='teamTitle'>{teamData.leaderName}</div>)}
                {!mode && <div className='name'>Team Leader</div>}
                {mode ? (
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Team Leader</label>
                    <input type="text" value={teamData.leaderName} name="leaderName" onChange={handleDataChange} className="form-control" required />
                  </div>
                ) : (<div className='teamLead'>{teamData.leaderName}</div>)}
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
                  <form>
                    {membersData.map((inputField) => {
                      return (
                      <div className='row' key={inputField.id}>
                        <div className="col-md-3 mb-3">
                          <label className="form-label">Member Name</label>
                          <input type="text" value={inputField.name} onChange={handleMembersChange} id={inputField.id} name="name" className="form-control"  required />
                        </div>
                        <div className="col-md-3 mb-3">
                          <label className="form-label">Responsibility</label>
                          <input type="text" value={inputField.responsibility} onChange={handleMembersChange} id={inputField.id} name="responsibility" className="form-control" required />
                        </div>

                        <span className='btns col-md-3'>
                          {/* <button className='btn' disabled={inputFields.length === 1} >
                            <FaMinus />
                          </button> */}
                          <button className='btn' onClick={handleAddFields}>
                            <FaPlus />
                          </button>
                        </span>
                      </div>
                    )})}
                    <div className="row">
                      <div className="col-md-4 col-6">
                        <button className='btn btn-outline-primary' onClick={handleUpdateTeam} >Update</button>
                      </div>
                      <div className="col-md-6 col-6"><BsTrash onClick={handleDelete} className='ic' color='#025EE5' size={50} /></div>

                    </div>
                  </form>
                </div>
              ) : (
                <>
                  { teamData && teamData.teamMembers && membersData.map((inputField) => {
                    return (
                    <>
                      <div className="col-md-6 col-6 my-3"><div className='customBorder'>{inputField.name}</div></div>
                      <div className="col-md-6 col-6 my-3"><div className='customBorder'>{inputField.responsibility}</div></div>
                    </>
                  )})}
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

