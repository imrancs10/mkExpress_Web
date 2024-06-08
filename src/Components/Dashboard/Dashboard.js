import React, { useState, useEffect } from 'react'
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
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import '../Dashboard/dashboard.css'

export default function Dashboard() {
    const [shipmentCountChartData, setShipmentCountChartData] = useState({});
    const filterTemplate = {
        shipmentChartYear: new Date().getFullYear(),
        shipmentChartStatus: 'all'
    }
    const [filter, setFilter] = useState(filterTemplate);
    const [statusWiseCount, setStatusWiseCount] = useState([]);
    useEffect(() => {
        getShipmentStatusCount();
    }, [filter.shipmentChartYear, filter.shipmentChartStatus])

    const getShipmentStatusCount = () => {
        let apiList = [];
        apiList.push(Api.Get(apiUrls.dashboardController.getShipmentCount + `year=${filter.shipmentChartYear}&status=${filter.shipmentChartStatus}`))
        apiList.push(Api.Get(apiUrls.dashboardController.getShipmentStatusWiseCount + `year=${filter.shipmentChartYear}`))
        Api.MultiCall(apiList)
            .then(res => {
                setShipmentCountChartData(res[0].data);
                setStatusWiseCount(res[1].data);
            });
    }

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
                text: 'Shipment Status',
            },
        },
    };
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const data = {
        labels,
        datasets: [
            {
                label: shipmentCountChartData?.label,
                data: shipmentCountChartData?.data,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };
    const getYearList = () => {
        var years = [];
        var currYear = new Date().getFullYear();
        for (let index = currYear; index >= currYear - 10; index--) {
            years.push(index);
        }
        return years
    }

    const filterChangeHandler = (e) => {
        var { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    }

    const getBtnClass = (status) => {
        if (status === filter.shipmentChartStatus)
            return "btn btn-primary btn-sm active"
        else
            return "btn btn-primary btn-sm"
    }

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

                                        <select name="shipmentChartYear" onChange={filterChangeHandler} value={filter.shipmentChartYear} className="">
                                            {getYearList()?.map((ele, index) => {
                                                return <option key={index} value={ele}>{ele}</option>
                                            })}
                                        </select>
                                        <button type="button" onClick={e => setFilter({ ...filter, ["shipmentChartStatus"]: "all" })} className={getBtnClass("all")}> All</button>
                                        <button type="button" onClick={e => setFilter({ ...filter, ["shipmentChartStatus"]: "delivered" })} className={getBtnClass("delivered")}>Delivered</button>
                                        <button type="button" onClick={e => setFilter({ ...filter, ["shipmentChartStatus"]: "canceled" })} className={getBtnClass("canceled")}>Canceled</button>
                                        <button type="button" onClick={e => setFilter({ ...filter, ["shipmentChartStatus"]: "lost" })} className={getBtnClass("lost")}>Lost</button>
                                        <button type="button" onClick={e => setFilter({ ...filter, ["shipmentChartStatus"]: "returnedtocustomer" })} className={getBtnClass("returnedtocustomer")}>Returned To Customer</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div style={{ height: '200px', width: '100%' }}>
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
                                    {
                                        statusWiseCount?.map((ele, index) => {
                                            return <tr key={index}>
                                                <td>{ele?.status}</td>
                                                <td>{ele?.count}</td>
                                            </tr>
                                        })
                                    }

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
