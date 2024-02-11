import ButtonBox from "../Common/ButtonBox"
import { common } from "./common"
import { CheckInStation, CheckOutStation } from '../Container/ContainerCheckinModel'

const getJourneyRoute = (data) => {
  return <>
    <div className='journey-container text-start'>
      <span style={{ fontSize: '13px' }}>{`${data?.fromStationName} - ${data?.fromStationCode}`} </span>
      {
        data?.masterJourneyDetails?.map((res, ind) => {
          return <span style={{ fontSize: '13px' }}>{`${res?.subStationName} - ${res?.subStationCode}`} </span>
        })
      }
      <span style={{ fontSize: '13px' }}>{`${data?.toStationName} - ${data?.toStationCode}`} </span>
    </div></>
}
const headerFormat = {
  customerDetails: [
    { name: 'Id', prop: 'id', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Name', prop: 'name', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Maximum Of Delivery Attempts', prop: 'maxDeliveryAttempts', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Confirmed', prop: 'confirmed', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Preferred Pickup Time', prop: 'preferredPickupTime', action: { hAlign: "center", dAlign: "center" } },
  ],
  memberDetails: [
    {
      name: 'Name', prop: 'name', customColumn: (data) => {
        return `${data?.firstName} ${data?.lastName}`
      }, action: { hAlign: "center", dAlign: "center" }
    },
    { name: 'Email', prop: 'email', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Gender', prop: 'genderName', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Mobile', prop: 'mobile', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Role', prop: 'role', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Personal Phone', prop: 'personalPhone', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Id Number', prop: 'idNumber', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Station', prop: 'station', action: { hAlign: "center", dAlign: "center" } },
  ],

  shipmentDetails: [
    {
      name: () => {
      },
      customColumn: () => {

      },
      action: { hAlign: "center", dAlign: "center" }
    },
    {
      name: 'References', prop: 'uniqueRefNo', customColumn: (data) => {
        return <>
          <span>{data?.shipmentNumber}</span>
          <br />
          <span>{data?.uniqueRefNo}</span>
        </>
      },
      action: { hAlign: "center", dAlign: "center" }
    },
    { name: 'Created On', prop: 'createdAt', action: { hAlign: "center", dAlign: "center", ampm: true } },
    { name: 'Schedule Pickup Date', prop: 'schedulePickupDate', action: { hAlign: "center", dAlign: "center", ampm: true } },
    { name: 'Pickup Date', prop: 'pickupDate', action: { hAlign: "center", dAlign: "center", ampm: true } },
    {
      name: 'Shipper', prop: 'shipperName',
      customColumn: (data) => {
        return common.defaultIfEmpty(data?.shipmentDetail?.shipperName, "");
      },
      action: { hAlign: "center", dAlign: "center" }
    },
    {
      name: 'Consignee', prop: 'consigneeName',
      customColumn: (data) => {
        return common.defaultIfEmpty(data?.shipmentDetail?.consigneeName, "");
      },
      action: { hAlign: "center", dAlign: "center" }
    },
    {
      name: 'AMS Address', prop: 'name',
      customColumn: (data) => {
        return <ButtonBox className="btn-sm w-100" style={{ width: '100%' }} type="save" text="AMS"></ButtonBox>
      },
      action: { hAlign: "center", dAlign: "center" }
    },
    { name: 'Customer', prop: 'customerName', action: { hAlign: "center", dAlign: "center" } },
    { name: 'COD', prop: 'codAmount', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Status', prop: 'status', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Status Reason', prop: 'statusReason', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Courier', prop: 'idNumber', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Failed delivery', prop: 'failedDelivery', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Delivery Date', prop: 'deliveryDate', action: { hAlign: "center", dAlign: "center", ampm: true } },
    {
      name: 'Status Duration', prop: 'statusDuration', customColumn: (data) => {
        return `${parseInt(Math.abs(new Date() - new Date(data?.lastStatusUpdate)) / 36e5)} Hour`;
      }, action: { hAlign: "center", dAlign: "center" }
    },
    { name: 'Scheduled Delivery Date', prop: 'scheduleDeliveryDate', action: { hAlign: "center", dAlign: "center", ampm: true } },
    { name: 'Location', prop: 'location', action: { hAlign: "center", dAlign: "center" } },
  ],
  customerDetail: [
    { name: 'Id', prop: 'id', action: { hAlign: "start", dAlign: "start" } },
    { name: 'Name', prop: 'name', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Email', prop: 'email', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Contact No', prop: 'contactNo', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Address', prop: 'address', action: { hAlign: "center", dAlign: "center" } },
    { name: 'City', prop: 'city', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Zip code', prop: 'zipCode', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Max Delivery Attempt', prop: 'maxDeliveryAttempt', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Preferred Pickup Time', prop: 'preferredPickupTime', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Confirmed', prop: 'confirmed', action: { replace: { "true": "Yes", "false": "No" }, hAlign: "center", dAlign: "center" } },
  ],
  thirdPartyDetail: [
    { name: 'Name', prop: 'name', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Email', prop: 'email', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Mobile', prop: 'mobile', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Contact No', prop: 'contact', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Tracking Url', prop: 'trackingUrl', action: { hAlign: "center", dAlign: "center" } },
  ],
  containerDetail: [
    { name: 'Container No.', prop: 'containerNo', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Container Type', prop: 'containerType', action: { hAlign: "center", dAlign: "start" } },
    { name: 'Total Shipments', prop: 'totalShipments', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Journey', prop: 'journey', action: { hAlign: "center", dAlign: "start" } },
    { name: 'CreatedOn', prop: 'createdAt', action: { hAlign: "center", dAlign: "start", ampm: true } },
    { name: 'ClosedOn', prop: 'closedOn', action: { hAlign: "center", dAlign: "start", ampm: true } },
    { name: 'ClosedBy', prop: 'closedByMember', action: { hAlign: "center", dAlign: "start" } },
  ],
  containerShipments: [
    { name: 'Shipment No.', prop: 'shipmentNumber', action: { hAlign: "start", dAlign: "start" } },
    { name: 'Status', prop: 'status', action: { hAlign: "center", dAlign: "center" } },
    {
      name: 'Consignee City', prop: 'cosigneeCity', customColumn: (data) => {
        return data?.shipmentDetail?.consigneeCity;
      }, action: { hAlign: "center", dAlign: "center" }
    },
    {
      name: 'Shipper City', prop: 'ShipperCity', customColumn: (data) => {
        return data?.shipmentDetail?.shipperCity;
      }, action: { hAlign: "center", dAlign: "center" }
    }
  ],
  logisticRegion: [
    { name: 'Id', prop: 'id', action: { hAlign: "start", dAlign: "start" } },
    { name: 'Country', prop: 'country', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Province', prop: 'province', action: { hAlign: "center", dAlign: "center" } },
    { name: 'City', prop: 'city', action: { hAlign: "center", dAlign: "center" } },
    { name: 'District', prop: 'district', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Station', prop: 'station', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Parent Station', prop: 'parentStation', action: { hAlign: "center", dAlign: "center" } },
  ],
  containerTracking: [
    { name: 'Id', prop: 'id', action: { hAlign: "start", dAlign: "start" } },
    { name: 'Code', prop: 'code', action: { hAlign: "center", dAlign: "start" } },
    { name: 'Station', prop: 'stationName', action: { hAlign: "center", dAlign: "start" } },
    { name: 'Created On', prop: 'createdAt', action: { hAlign: "center", dAlign: "start", ampm: true } },
    { name: 'Created By', prop: 'createdMember', action: { hAlign: "center", dAlign: "start" } },
  ],
  containerCheckInOut: [
    { name: 'Station', prop: 'stationName', action: { hAlign: "start", dAlign: "start" } },
    {
      name: 'Arrived At', prop: 'arrivalAt',
      customColumn: (data) => {
        if (data.isSourceStation)
          return "Not Applicable";
        else if (data?.arrivalAt === "0001-01-01T00:00:00")
          return <ButtonBox type="check-success" onClickHandler={CheckInStation} onClickHandlerData={data} className="btn-sm btn-success" text="Check-In"></ButtonBox>
        else
          return common.getHtmlDate(data?.arrivalAt, 'ddmmyyyyhhmmss', 12);

      }, action: { hAlign: "center", dAlign: "center", ampm: true }
    },
    {
      name: 'Departure On', prop: 'departureOn',
      customColumn: (data) => {
        if (data.isDestinationStation)
          return "Not Applicable";
        else if (data?.departureOn === "0001-01-01T00:00:00")
          return <ButtonBox type="check-danger" onClickHandler={CheckOutStation} onClickHandlerData={data} className="btn-sm btn-danger" text="Check-Out"></ButtonBox>
        else
          return common.getHtmlDate(data?.departureOn, 'ddmmyyyyhhmmss', 12);
      }, action: { hAlign: "center", dAlign: "center", ampm: true }
    },
  ],
  masterJourney: [
    {
      name: 'Journey', prop: 'masterDataTypeValue', customColumn: (data => {
        return getJourneyRoute(data);
      })
    },
  ],
  courierRunsheet: [
    {
      name: 'References', prop: 'id', customColumn: (data) => {
        return <>
          <span>Number : {data?.shipmentNumber}</span>
          <br/>
          <span>Reference: {data?.uniqueRefNo}</span>
        </>
      }, action: { hAlign: "start", dAlign: "start" }
    },
    {
      name: 'Commodity', prop: 'id', customColumn: (data) => {
        return <>
          <span>Weight : {common.printDecimal(data?.weight)}</span>
          <br/>
          <span>Dimensions: {data?.dimension}</span>
        </>
      }, action: { hAlign: "start", dAlign: "start" }
    },
    {
      name: 'Shipper', prop: 'id', customColumn: (data) => {
        return `${data?.shipperName}, ${data?.shipperAddress1}, ${data?.shipperAddress2}, ${data?.shipperAddress3},${data?.shipperCity}`
      }, action: { hAlign: "start", dAlign: "start" }
    },
    {
      name: 'Consignee', prop: 'id', customColumn: (data) => {
        return `${data?.consigneeName}, ${data?.consigneeAddress1}, ${data?.consigneeAddress2}, ${data?.consigneeAddress3},${data?.consigneeCity}`
      }, action: { hAlign: "start", dAlign: "start" }
    },
    { name: 'Customer', prop: 'customer', action: { hAlign: "start", dAlign: "start" } },
    { name: 'COD', prop: 'codAmount', action: { hAlign: "start",decimal:true, dAlign: "start" } },
    { name: 'Number Of Pieces', prop: 'noOfPiece', action: { hAlign: "start", dAlign: "start" } },
    { name: 'Status', prop: 'status', action: { hAlign: "start", dAlign: "start" } },
  ],
  receiveShipments: [
    {
      name: 'References', prop: 'id', customColumn: (data) => {
        return <>
          <span>Number : {data?.shipmentNumber}</span>
          <br/>
          <span>Reference: {data?.uniqueRefNo}</span>
        </>
      }, action: { hAlign: "start", dAlign: "start" }
    },
    {
      name: 'Commodity', prop: 'id', customColumn: (data) => {
        return <>
          <span>Weight : {common.printDecimal(data?.shipmentDetail?.weight)}</span>
          <br/>
          <span>Dimensions: {data?.shipmentDetail?.dimension}</span>
        </>
      }, action: { hAlign: "start", dAlign: "start" }
    },
    {
      name: 'Shipper', prop: 'id', customColumn: (data) => {
        return `${data?.shipmentDetail?.shipperName}, ${data?.shipmentDetail?.shipperAddress1}, ${data?.shipmentDetail?.shipperAddress2}, ${data?.shipmentDetail?.shipperAddress3},${data?.shipmentDetail?.shipperCity}`
      }, action: { hAlign: "start", dAlign: "start" }
    },
    {
      name: 'Consignee', prop: 'id', customColumn: (data) => {
        return `${data?.shipmentDetail?.consigneeName}, ${data?.shipmentDetail?.consigneeAddress1}, ${data?.shipmentDetail?.consigneeAddress2}, ${data?.shipmentDetail?.consigneeAddress3},${data?.shipmentDetail?.consigneeCity}`
      }, action: { hAlign: "start", dAlign: "start" }
    },
    { name: 'Customer', prop: 'customer', action: { hAlign: "start", dAlign: "start" } },
    { name: 'Status', prop: 'status', action: { hAlign: "start", dAlign: "start" } },
  ]
}

export { headerFormat };