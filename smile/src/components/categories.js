import React from 'react'

const categories = () => {
 
    const dataCat = [
        {
            cateName:'Fashion'
        },
        {

            cateName:'Electronic'
        },
        {
            cateName:'Cars'
        },
        {
            cateName:'Books'
        },
        {
            cateIcons:'../public/images/icons8-house-64.png',
            cateName:'Home & Garden'
        },
        {
            cateIcons:'../public/images/icons8-lip-gloss-50.png',
            cateName:'Health & Beauty'
        },
    ]
  return (
    <>
    <div>
        {dataCat.map((value, index)=>{
            return(
                <div className='box f-flex' key={index}>
                    <img src={value.cateIcons} alt=''></img>
                    <span>{value.cateName}</span>
                </div>
            )
      })}
    </div>
    
    </>
  )
  
}

export default categories