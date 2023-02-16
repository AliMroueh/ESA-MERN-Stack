import * as React  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getallCategoriesAction } from '../../actions/categoryActions';
import LoadingBox from '../../components/LoadingBox'
import MessageBox from '../../components/MessageBox'

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

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getallCategories = useSelector((state) => state.getallCategories);

    const { loading, error, categories } = getallCategories;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
    setOpen(!open);
  };

  React.useEffect(() => {

    dispatch(getallCategoriesAction())
    
    
  }, [dispatch])

  if (!loading) {
    console.log(categories)
  }



  return (
  <>
       <button onClick={handleOpen} className="btn1">Categories <i className='fa fa-chevron-down'></i></button>
       
            <div className="dropdown">
              {loading ? <LoadingBox></LoadingBox>
              : error ? <MessageBox variant='danger'>{error}</MessageBox>
              :
              open &&                
                <ul className="menu">
                  
                  {categories.map((value, index) => {
          return (
            <li className="menu-item">
                    <button onClick={() => 
                        {navigate(`/search/category/${value.name}`)
                        setOpen(!open)
                        }}>{value.name}</button>
                    </li>
          )})}
                </ul>
          }
             
              
             </div>
         </>
        )}
  


export default Categories