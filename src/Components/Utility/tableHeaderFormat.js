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
  ]
}

export { headerFormat};