import * as React  from 'react'

const Categories = () => {
 
    const dataCat = [
        {
            cateIcons:'images/icons8-long-formal-dress-55.png',
            cateName:'Fashion'
        },
        {
            cateIcons:'images/icons8-iphone-se-55.png',
            cateName:'Electronic'
        },
        {
            cateIcons:'images/icons8-cars-55.png',
            cateName:'Cars'
        },
        {
            cateIcons:'images/icons8-open-book-55.png',
            cateName:'Books'
        },
        {
            cateIcons:'images/icons8-house-55.png',
            cateName:'Home '
        },
        {
            cateIcons:'images/icons8-makeup-brush-55.png',
            cateName:'Beauty'
        },
    ]
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
    setOpen(!open);
  };


  return (
  <>
       <button onClick={handleOpen} className="btn1">Categories <i className='fa fa-chevron-down'></i></button>
       
            <div className="dropdown">
              {open &&                
                <ul className="menu">
                  
                  {dataCat.map((value, index) => {
          return (
            <li className="menu-item">
                    <button>{value.cateName}</button>
                    </li>
          )})}
                </ul>
          }
             
              
             </div>
         </>
        )}
  


export default Categories