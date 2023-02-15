
import FlashCard from "./FlashCard"
import "./style.css"

const FlashDeals = (products) => {
 
  return (
    <>
      <section className='flash'>
        <i className='fa fa-bolt fa-2x'></i>
        <h1 className="title5">Flash Delas</h1>
        <div className='container'>
          <div className='heading f_flex'>
          </div>
          <FlashCard />
        </div>
      </section>
    </>
  )
}

export default FlashDeals