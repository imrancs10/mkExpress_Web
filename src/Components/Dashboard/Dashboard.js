import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

export default function Dashboard() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data:[102,245,364,222,900,692,2,-204],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data:[234,563,-192,44,786,102,245,364,222,900,692,2,-204],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
    return (
        <>
            <div className='row'>
                <div className='col-12'>
                    <div className="card  mb-3">
                        <div className="card-header bg-light">
                            <div className='d-flex justify-content-between'>
                                <div className='card-header-text'>Shipments</div>
                                <div>
                                    <div className="btn-group me-2 btn-group-sm" role="group" aria-label="Second group">
                                        <button type="button" className="btn btn-primary btn-sm">All</button>
                                        <button type="button" className="btn btn-primary btn-sm">Delivered</button>
                                        <button type="button" className="btn btn-primary btn-sm">Failed</button>
                                        <button type="button" className="btn btn-primary btn-sm">Lost</button>
                                        <button type="button" className="btn btn-primary btn-sm">Returned</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                        <div style={{height:'200px',width:'100%'}}>
                        <Line options={options} width={'1000px'} data={data} />;
                        </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-5 col-sm-12'>
                    <div className="card  mb-3">
                        <div className="card-header bg-light">
                            <div className='d-flex justify-content-between'>
                                <div className='card-header-text'>Shipments Statuses Counts</div>
                            </div>
                        </div>
                        <div className="card-body">
                        <table className='table table-striped table-sm'>
                                <thead>
                                    <tr>
                                        <th>Status</th>
                                        <th>Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr></tr>
                                </tbody>
                            </table>
                         </div>
                    </div>
                </div>
                <div className='col-md-7 col-sm-12'>
                    <div className="card  mb-3">
                        <div className="card-header bg-light">
                            <div className='d-flex justify-content-between'>
                                <div className='card-header-text'>Shipments</div>
                                <div>
                                    <div className="btn-group me-2 btn-group-sm" role="group" aria-label="Second group">
                                        <button type="button" className="btn btn-primary btn-sm">Export</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='table-scroller'>
                            <table className='table table-striped table-sm'>
                                <thead>
                                    <tr>
                                        <th>Courier Name</th>
                                        <th>Assigned For Pickup</th>
                                        <th>Picked up</th>
                                        <th>Out for delivery</th>
                                        <th>Out for return</th>
                                        <th>Failed Atempt</th>
                                        <th>Delivered</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr></tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
