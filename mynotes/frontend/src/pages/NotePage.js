import { getStaticContextFromError } from '@remix-run/router';
import React, {useEffect, useState } from 'react'
import {useParams, Link, useNavigate } from 'react-router-dom'
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

const NotePage = ({match}) => {
  const navigate = useNavigate();

    let {id} = useParams();
    let [note, setNote] = useState([])


    useEffect(()=>{
        getNote()
    },[id])

    let getNote = async() =>{
      if (id === 'new') return 
        let response = await fetch(`/api/notes/${id}`)
        let data = await response.json()
        setNote(data)
    }

    let createNote = async()=>{
      fetch(`/api/notes/create/`,{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify(note)
      })
    }


    let updateNote = async()=>{
      fetch(`/api/notes/${id}/update`,{
        method:"PUT",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify(note)
      })
    }

    let deleteNote = async()=>{
      fetch(`/api/notes/${id}/delete`,{
        method:"DELETE",
        headers:{
          "content-type":"application/json"
        }
      })
      navigate("/")
    }
    
    let handleSubmit =()=>{
      console.log("Note:", note)
      if(id!== 'new' && note.body ===''){
        console.log("delete")
        deleteNote()
      }else if(id!=='new'){
        updateNote()
      }else if(id==='new' && note!==null){
        createNote()
      }
      navigate('/');
    }

  let handleChange  = (value)=>{
    setNote(note =>({...note,'body':value}))
    console.log("handle change:",note)
  }
    
  return (
    <div className='note'>
        <div className='note-header'>
            <h3>
                <ArrowLeft  onClick={handleSubmit}/>
            </h3>
            {id !== 'new' ?(
              <button onClick={deleteNote}>Delete</button>
            ):(
              <button onClick={handleSubmit}>Done</button>
            )}
        </div>
      <textarea  onChange={(e)=>{handleChange(e.target.value)}} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage
