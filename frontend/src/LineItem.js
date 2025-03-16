import React from 'react'
import { FaTrash } from "react-icons/fa6";

const LineItem = ({item,handleChange,handleDelete}) => {
  return (
    <li className="item" >
                 <input type="checkbox" 
                 onChange ={() => handleChange(item.id)}
                 checked = {item.checked}/>
                 <label  
                 style = {(item.checked) ? {textDecoration:'line-through'} : null}
                 onDoubleClick ={() => handleChange(item.id)}>{item.item}</label>
                 <FaTrash 
                 role="button"
                 onClick ={() => handleDelete(item.id)}
                 tabIndex="0"
   
                 />
   
   
             </li>
  )
}

export default LineItem