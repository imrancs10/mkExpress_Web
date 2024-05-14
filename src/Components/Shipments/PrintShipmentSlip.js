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
        if (shipmentIds === "")
            return;
        Api.Get(apiUrls.shipmentController.getByIds + `${shipmentIds}`)
            .then(res => {
                setShipmentDetails(res.data);
            });
    }, []);

    return (
        <>
            <div className="modal fade" id="modalPrintShipmentSlip" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalPrintShipmentSlipLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalPrintShipmentSlipLabel">Shipment Print</h1>
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
                                {/* <div className='print-container'>
                           <table>
                                <thead>
                                    <tr>
                                        <th colSpan="3"><Barcode displayValue={false} value={'928937492479272'} width={3} height={90} /></th>
                                        <th colSpan="3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="4" rowSpan="2">928937492479272</td>

                                        <td>Origin</td>

                                        <td>Riyadh</td>

                                    </tr>
                                    <tr>
                                        <td>Print On</td>

                                        <td>{new Date().toDateString()}</td>

                                    </tr>
                                    <tr>
                                        <td colSpan="1">Total COD</td>

                                        <td colSpan="3">0.0</td>

                                        <td colSpan="2" rowSpan="3">Riyadh</td>

                                    </tr>
                                    <tr>
                                        <td colSpan="1">Weight</td>

                                        <td colSpan="3">8.0</td>

                                    </tr>
                                    <tr>
                                        <td colSpan="1">Piece</td>

                                        <td colSpan="3">1 of 2</td>

                                    </tr>
                                    <tr>
                                        <td colSpan="5">Consignee</td>

                                        <td rowSpan="11" className='v-bar'>
                                            <div style={{ transform: 'rotate(90deg)' }}>
                                                <Barcode displayValue={false} st value={'928937492479272'} width={2.2} height={90} />
                                            </div>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td>Name</td>

                                        <td colSpan="4">Satish</td>

                                    </tr>
                                    <tr>
                                        <td>Mobile</td>

                                        <td colSpan="2">17182318212381</td>

                                        <td colSpan="2">192u3182yu30</td>

                                    </tr>
                                    <tr>
                                        <td rowSpan="6">Address</td>

                                        <td colSpan="4" rowSpan="2">b hahjadhbajs dajdjadjadjahdjda a jajdajd j ja dja dja jda dadja dja djad</td>

                                    </tr>
                                    <tr>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" rowSpan="3">aajsnd akjduaeqjwnekjwqneq NewShipmentq e
                                            qw eqwe
                                            e qwq weightq</td>

                                    </tr>
                                    <tr>
                                    </tr>
                                    <tr>
                                    </tr>
                                    <tr>
                                        <td colSpan="4">Riyadh</td>

                                    </tr>
                                    <tr>
                                        <td>Shipper</td>

                                        <td colSpan="4"></td>

                                    </tr>
                                    <tr>
                                        <td>Custome Name</td>

                                        <td colSpan="4"></td>

                                    </tr>
                                    <tr>
                                        <td>Description</td>

                                        <td colSpan="5"></td>

                                    </tr>
                                    <tr>
                                        <td>Reference</td>

                                        <td colSpan="5"></td>

                                    </tr>
                                    <tr>
                                        <td>Remark</td>

                                        <td colSpan="5"></td>

                                    </tr>
                                </tbody>
                            </table>
                           </div> */}



                                {/* <div className='print-container'>
                                    <p className="s1" style={{ paddingLeft: "14pt", textIndent: "0pt", textAlign: "left" }}>
                                        <span>
                                            <table border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td>
                                                        <img width="152" height="43" src="" />
                                                    </td>
                                                </tr>
                                            </table>
                                        </span>
                                    </p>
                                    <table style={{ borderCollapse: "collapse", width: "100%" }} cellspacing="0">
                                        <tr>
                                            <td colSpan={4}>
                                                <table style={{width:"100%",border:"none"}}>
                                                    <tr>
                                                        <td rowspan="2" colSpan="2">
                                                            <p className="s2">240501889038</p>
                                                        </td>
                                                        <td>
                                                            <p className="s3" >Origin</p>
                                                        </td>
                                                        <td>
                                                            <p className="s3" style={{ paddingTop: "4pt", paddingLeft: "4pt", textIndent: "0pt", textAlign: "left" }}>Dammam</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p className="s3" style={{ paddingTop: "3pt", paddingLeft: "1pt", textIndent: "0pt", textAlign: "left" }}>Printed on</p>
                                                        </td>

                                                        <td>
                                                            <p className="s4" style={{ paddingTop: "4pt", paddingLeft: "1pt", textIndent: "0pt", textAlign: "left" }}>2024-05-11</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="s3" style={{ paddingLeft: "4pt", textIndent: "0pt", lineHeight: "12pt", textAlign: "left" }}>Total COD:
                                                    <span className="s5"></span>
                                                    <span className="s6">0.0</span>
                                                </p>
                                            </td>
                                            <td colspan="2" rowspan="3">
                                                <p className="s7" style={{ paddingTop: "13pt", paddingLeft: "24pt", textIndent: "0pt", textAlign: "left" }}>Riyadh</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="s3" style={{ paddingTop: "3pt", paddingLeft: "4pt", textIndent: "0pt", textAlign: "left" }}>Weight:
                                                    <span className="s5"></span>
                                                    4.5</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="s8" style={{ paddingTop: "3pt", paddingLeft: "1pt", textIndent: "0pt", textAlign: "left" }}>Piece: 1 of 1</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <p className="s9" style={{ paddingTop: "3pt", paddingLeft: "1pt", textIndent: "0pt", textAlign: "left" }}>Consignee</p>
                                            </td>
                                            <td rowspan="8">
                                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                                    <br />
                                                </p>
                                                <p style={{ paddingLeft: "11pt", textIndent: "0pt", textAlign: "left" }} />
                                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                                    <br />
                                                </p>
                                                <p style={{ paddingLeft: "11pt", textIndent: "0pt", lineHeight: "6pt;", extAlign: "left" }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <p className="s10" style={{ paddingTop: "2pt", paddingRight: "73pt", textIndent: "0pt", textAlign: "right" }}>Name
                                                    <span className="s11">نوسحوبا نانك</span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="s10" style={{ paddingTop: "2pt", paddingLeft: "1pt", textIndent: "0pt", textAlign: "left" }}>Mobile
                                                    <span className="s12"></span>
                                                    <span className="s3">966540382603</span>
                                                </p>
                                            </td>
                                            <td>
                                                <p style={{ textIndent: "0pt", textAlign: "left" }}>
                                                    <br />
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td rowspan="3">
                                                <p className="s10" style={{ paddingTop: "3pt", paddingLeft: "1pt", textIndent: "0pt", textAlign: "left" }}>Address</p>
                                            </td>
                                            <td>
                                                <p className="s3" style={{ paddingRight: "105pt", textIndent: "0pt", textAlign: "right" }}>ضايرلا ,نيطح</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="s3" style={{ paddingTop: "1pt", paddingLeft: "4pt", textIndent: "0pt", textAlign: "left" }}>,</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="s3" style={{ paddingTop: "3pt", paddingLeft: "4pt", textIndent: "0pt", textAlign: "left" }}>Riyadh</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="s10" style={{ paddingTop: "2pt", paddingLeft: "1pt", textIndent: "0pt", textAlign: "left" }}>Shipper</p>
                                            </td>
                                            <td >
                                                <p className="s3" style={{ paddingTop: "3pt", paddingRight: "114pt", textIndent: "0pt", textAlign: "right" }}>يلع نيراد</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <p className="s3" style={{ paddingTop: "2pt", paddingRight: "124pt", textIndent: "0pt", lineHeight: "68%;", extAlign: "left" }}>Customer <span className="s13">OTO </span>Name</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3">
                                                <p className="s3" style={{ paddingTop: "5pt", paddingLeft: "1pt", textIndent: "0pt", textAlign: "left" }}>Discreption  no description</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3">
                                                <p className="s3" style={{ paddingTop: "4pt", paddingLeft: "1pt", textIndent: "0pt", textAlign: "left" }}>Referance  <span className="s14">OID-23742-2511</span></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3">
                                                <p className="s3" style={{ paddingTop: "4pt", paddingLeft: "1pt", textIndent: "0pt", textAlign: "left" }}>Remark:</p>
                                            </td>
                                        </tr>
                                    </table>
                                    <p style={{ textIndent: "0pt", textAlign: "left" }} />
                                    <p style={{ paddingTop: "7pt", paddingLeft: "146pt", textIndent: "0pt", textAlign: "left" }}>For more info call us at: 8001242224</p>

                                </div> */}
                                <div className='print-container'>
                                    <Barcode height="50px" width="1px" value="12345678909876" />
                                    <table className='tbl-1'>
                                        <tr>
                                            <td className="tg-o5vb" colspan="4" rowSpan={2} >

                                            </td>
                                            <td className="tg-0pky">Origin</td>
                                            <td className="tg-0pky">Damman</td>
                                        </tr>
                                        <tr>
                                            <td className="tg-0pky">Printed On</td>
                                            <td className="tg-0pky">2024-05-12</td>
                                        </tr>
                                        <tr>
                                            <td className="tg-0pky" colspan="4"><span>COD</span><span>0.0</span></td>
                                            <td className="tg-0pky" colspan="2" rowspan="3">Riyaad</td>
                                        </tr>
                                        <tr>
                                            <td className="tg-0pky" colspan="4"><span>Weight</span><span>0.0</span></td>
                                        </tr>
                                        <tr>
                                            <td className="tg-0pky" colspan="4"><span>Item</span><span>2 of 1</span></td>
                                        </tr>
                                    </table>
                                    <table className='tbl-2'>
                                        <colgroup>
                                            <col span="1" style={{width: "15%"}} /> 
                                            <col span="1" style={{width: "15%"}} />
                                            <col span="1" style={{width: "15%"}} />
                                            <col span="1" style={{width: "15%"}} />
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <td className="tg-0pky" colspan="5">Consignee</td>

                                                <td  rowspan="11" className='vertical-barcode-container'>
                                                        <Barcode className="vertical-barcode" height="50px" width="2px" value="12345678909876" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="tg-0pky" colspan="5">Name : Satish am</td>
                                            </tr>
                                            <tr>
                                                <td className="tg-0pky" colspan="3"><span>Mobile</span></td>
                                                <td className="tg-0pky" colspan="2"><span>9990614499</span></td>
                                            </tr>
                                            <tr>
                                                <td className="tg-0pky" rowspan="6">Address</td>
                                                <td className="tg-0pky" colspan="4" rowspan="2">TEst Addres1</td>
                                            </tr>
                                            <tr>
                                            </tr>
                                            <tr>
                                                <td className="tg-0pky" colspan="4" rowspan="3">Test Address2</td>
                                            </tr>
                                            <tr>
                                            </tr>
                                            <tr>
                                            </tr>
                                            <tr>
                                                <td className="tg-0pky" colspan="4">Test Address3</td>
                                            </tr>
                                            <tr>
                                                <td className="tg-0pky">Shiiper</td>
                                                <td className="tg-0pky" colspan="4"></td>
                                            </tr>
                                            <tr>
                                                <td className="tg-0pky" colspan="5"><span>Customer Name</span><span>Sheikh Imran</span></td>
                                            </tr>
                                            <tr>
                                                <td className="tg-0pky" colspan="6"><span>Description</span><span>No Description</span></td>
                                            </tr>
                                            <tr>
                                                <td className="tg-0pky" colspan="6"><span>Reference</span><span>REF-00208376552</span></td>
                                            </tr>
                                            <tr>
                                                <td className="tg-0pky" colspan="6"><span>Remark</span><span>No Remark</span></td>
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
