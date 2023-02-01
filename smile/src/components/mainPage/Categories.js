import React from 'react'
import './Categories.css'
const Categories = () => {
 
    const dataCat = [
        {
            cateIcons:'images/icons8-dress-back-view-100.png',
            cateName:'Fashion'
        },
        {
            cateIcons:'images/icons8-electronic-64.png',
            cateName:'Electronic'
        },
        {
            cateIcons:'images/icons8-traffic-jam-50.png',
            cateName:'Cars'
        },
        {
            cateIcons:'images/icons8-books-52.png',
            cateName:'Books'
        },
        {
            cateIcons:'images/icons8-house-64.png',
            cateName:'Home '
        },
        {
            cateIcons:'images/icons8-lip-gloss-50.png',
            cateName:'Beauty'
        },
    ]
  return (
    <>
    <div>
        {dataCat.map((value, index)=>{
            return(
                <div className='box ' key={index}>
                    <img src={value.cateIcons} alt='' className='cateIcons'></img>
                    <span>{value.cateName}</span>
                </div>
            )
      })}
    </div>
    
    </>
  )
  
}

export default Categories