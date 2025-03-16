import React from 'react'
import LineItem from './LineItem'

const Itemlist = ({items,handleChange,handleDelete}) => {
  return (
   <ul>
           {items.map((item) => (

            <LineItem 
            item ={item} 
            key = {item.id}
            handleChange={handleChange}
            handleDelete ={handleDelete}

            />
            
           ))}
   
           
   
   
         </ul> 
  )
}

export default Itemlist