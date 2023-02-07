import * as React  from 'react'

const Categories = () => {
 
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
           cateName:'Home '
        },
        {
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