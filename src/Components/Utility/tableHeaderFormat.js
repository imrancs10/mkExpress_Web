import ButtonBox from "../Common/ButtonBox"
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
    { name: 'Created On', prop: 'createdAt', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Schedule Pickup Date', prop: 'schedulePickupDate', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Pickup Date', prop: 'pickupDate', action: { hAlign: "center", dAlign: "center" } },
    {
      name: 'Shipper', prop: 'shipperName',
      customColumn: (data) => {
        return data?.shipmentDetails[0]?.shipperName
      },
      action: { hAlign: "center", dAlign: "center" }
    },
    {
      name: 'Consignee', prop: 'consigneeName',
      customColumn: (data) => {
        return data?.shipmentDetails[0]?.consigneeName
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
    { name: 'Delivery Date', prop: 'deliveryDate', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Status Duration', prop: 'statusDuration', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Scheduled Delivery Date', prop: 'scheduleDeliveryDate', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Location', prop: 'location', action: { hAlign: "center", dAlign: "center" } },
  ],
  customerDetail: [
    { name: 'Id', prop: 'id', action: { hAlign: "start", dAlign: "start" } },
    { name: 'Name', prop: 'name', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Contact No', prop: 'contactNo', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Max Delivery Attempt', prop: 'maxDeliveryAttempt', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Preferred Pickup Time', prop: 'preferredPickupTime', action: { hAlign: "center", dAlign: "center" } },
  ],
  logisticRegion: [
    { name: 'Id', prop: 'id', action: { hAlign: "start", dAlign: "start" } },
    { name: 'Country', prop: 'country', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Province', prop: 'province', action: { hAlign: "center", dAlign: "center" } },
    { name: 'City', prop: 'city', action: { hAlign: "center", dAlign: "center" } },
    { name: 'District', prop: 'district', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Station', prop: 'station', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Parent Station', prop: 'parentStation', action: { hAlign: "center", dAlign: "center" } },
  ]
}

export { headerFormat };