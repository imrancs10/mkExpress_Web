import React, { useState, useEffect, useRef } from 'react'
import ReactToPrint from 'react-to-print';
import { Api } from '../../API/API';
import { apiUrls } from '../../API/ApiUrl';
import { common } from '../Utility/common';
import Barcode from 'react-barcode/lib/react-barcode';
import './shipment.css';

export default function PrintShipmentSlip({ shipmentIds, width, height }) {
    width = common.defaultIfEmpty(width,)
    const [shipmentDetails, setShipmentDetails] = useState([]);
    var printRef = useRef();
    useEffect(() => {
        Api.Get(apiUrls.shipmentController.getByIds + `${shipmentIds}`)
            .then(res => {
                setShipmentDetails(res.data);
            });
    }, []);

    return (
        <> <div className="modal fade" id="modalPrintShipmentSlip" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalPrintShipmentSlipLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="modalPrintShipmentSlipLabel">New Shipment</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <ReactToPrint
                            trigger={() => {
                                return <button className='btn btn-sm btn-success' data-bs-dismiss="modal"><i className='bi bi-printer'></i> Print</button>
                            }}
                            content={(el) => (printRef.current)}
                        />
                        <div ref={printRef}>
                           <div className='print-container'>
                           <table>
                                <thead>
                                    <tr>
                                        <th colspan="3"><Barcode displayValue={false} value={928937492479272} width={3} height={90} /></th>
                                        <th colspan="3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="4" rowspan="2">928937492479272</td>
                                        <td>Origin</td>
                                        <td>Riyadh</td>
                                    </tr>
                                    <tr>
                                        <td>Print On</td>
                                        <td>{new Date().toDateString()}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="1">Total COD</td>
                                        <td colspan="3">0.0</td>
                                        <td colspan="2" rowspan="3">Riyadh</td>
                                    </tr>
                                    <tr>
                                        <td colspan="1">Weight</td>
                                        <td colspan="3">8.0</td>
                                    </tr>
                                    <tr>
                                        <td colspan="1">Piece</td>
                                        <td colspan="3">1 of 2</td>
                                    </tr>
                                    <tr>
                                        <td colspan="5">Consignee</td>
                                        <td rowspan="11" className='v-bar'>
                                            <div style={{ transform: 'rotate(90deg)' }}>
                                                <Barcode displayValue={false} st value={928937492479272} width={2.2} height={90} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Name</td>
                                        <td colspan="4">Satish</td>
                                    </tr>
                                    <tr>
                                        <td>Mobile</td>
                                        <td colspan="2">17182318212381</td>
                                        <td colspan="2">192u3182yu30</td>
                                    </tr>
                                    <tr>
                                        <td rowspan="6">Address</td>
                                        <td colspan="4" rowspan="2">b hahjadhbajs dajdjadjadjahdjda a jajdajd j ja dja dja jda dadja dja djad</td>
                                    </tr>
                                    <tr>
                                    </tr>
                                    <tr>
                                        <td colspan="4" rowspan="3">aajsnd akjduaeqjwnekjwqneq NewShipmentq e
                                            qw eqwe
                                            e qwq weightq</td>
                                    </tr>
                                    <tr>
                                    </tr>
                                    <tr>
                                    </tr>
                                    <tr>
                                        <td colspan="4">Riyadh</td>
                                    </tr>
                                    <tr>
                                        <td>Shipper</td>
                                        <td colspan="4"></td>
                                    </tr>
                                    <tr>
                                        <td>Custome Name</td>
                                        <td colspan="4"></td>
                                    </tr>
                                    <tr>
                                        <td>Description</td>
                                        <td colspan="5"></td>
                                    </tr>
                                    <tr>
                                        <td>Reference</td>
                                        <td colspan="5"></td>
                                    </tr>
                                    <tr>
                                        <td>Remark</td>
                                        <td colspan="5"></td>
                                    </tr>
                                </tbody>
                            </table>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>

    )
}
