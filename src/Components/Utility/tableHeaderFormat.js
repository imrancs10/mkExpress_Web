const headerFormat = {  				
  customerDetails: [
    { name: 'Id', prop: 'id', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Name', prop: 'name', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Maximum Of Delivery Attempts', prop: 'maxDeliveryAttempts', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Confirmed', prop: 'confirmed', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Preferred Pickup Time', prop: 'preferredPickupTime', action: { hAlign: "center", dAlign: "center" } },
  ],				
  memberDetails: [
    { name: 'Name', prop: 'name', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Email', prop: 'email', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Mobile', prop: 'mobile', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Role', prop: 'role', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Personal Phone', prop: 'personalPhone', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Id Number', prop: 'idNumber', action: { hAlign: "center", dAlign: "center" } },
  ],
  																
  shipmentDetails: [
    { name: 'References', prop: 'name', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Created On', prop: 'email', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Schedule Pickup Date', prop: 'mobile', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Pickup Date', prop: 'role', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Shipper', prop: 'personalPhone', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Consignee', prop: 'idNumber', action: { hAlign: "center", dAlign: "center" } },    
    { name: 'AMS Address', prop: 'name', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Customer', prop: 'email', action: { hAlign: "center", dAlign: "center" } },
    { name: 'COD', prop: 'mobile', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Status', prop: 'role', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Status Reason', prop: 'personalPhone', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Courier', prop: 'idNumber', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Failed delivery', prop: 'name', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Delivery Date', prop: 'email', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Status Duration', prop: 'mobile', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Scheduled Delivery Date', prop: 'role', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Location', prop: 'personalPhone', action: { hAlign: "center", dAlign: "center" } },
  ],
  customerDetail:[
    { name: 'Id', prop: 'id', action: { hAlign: "start", dAlign: "start" } },
    { name: 'Name', prop: 'name', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Contact No', prop: 'contactNo', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Max Delivery Attempt', prop: 'maxDeliveryAttempt', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Preferred Pickup Time', prop: 'preferredPickupTime', action: { hAlign: "center", dAlign: "center" } },
  ],
  logisticRegion:[
    { name: 'Id', prop: 'id', action: { hAlign: "start", dAlign: "start" } },
    { name: 'Country', prop: 'country', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Province', prop: 'province', action: { hAlign: "center", dAlign: "center" } },
    { name: 'City', prop: 'city', action: { hAlign: "center", dAlign: "center" } },
    { name: 'District', prop: 'district', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Station', prop: 'station', action: { hAlign: "center", dAlign: "center" } },
    { name: 'Parent Station', prop: 'parentStation', action: { hAlign: "center", dAlign: "center" } },
  ]
}

export { headerFormat};