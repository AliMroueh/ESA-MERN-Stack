import React from 'react';
import { Chart } from "react-google-charts";

export default function AdminDashboard() {

  const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

  const options = {
    title: "My Daily Activities",
  };
  
  return (
    <div className='top'>
      <div className='row adminTop'>
          <h1 className='adminTitle'>Dashboard</h1>
      </div>
      <ul className="row summary">
            <li>
              <div className="summary-title color1">
                <span>
                  <i className="fa fa-users" /> Users
                </span>
              </div>
              <div className="summary-body">3</div>
            </li>
            <li>
              <div className="summary-title color2">
                <span>
                  <i className="fa fa-shopping-cart" /> Orders
                </span>
              </div>
              <div className="summary-body">
                6
              </div>
            </li>
            <li>
              <div className="summary-title color3">
                <span>
                <i className="fa-solid fa-sack-dollar"></i> Sales
                </span>
              </div>
              <div className="summary-body">
                $500
              </div>
            </li>
          </ul>
        <div>
          <h2>Categories</h2>
          </div>
        <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
    </div>
  )
}
