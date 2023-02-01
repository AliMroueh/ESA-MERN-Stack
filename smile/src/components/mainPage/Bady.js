import React from "react"
import Categories from "./Categories"
import "./Categories.css"
import Slider from "./Slider"

const Bady = () => {
  return (
    <>
      <section className='home'>
        <div className='container d_flex'>
          <Categories />
          <Slider />
        </div>
      </section>
    </>
  )
}

export default Bady
