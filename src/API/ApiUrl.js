const apiPrfix = "v1";
export const apiUrls = {
    authController: {
        getToken: `${apiPrfix}/auth/user/login`,
    },
    masterDataController: {
        add: `${apiPrfix}/masterData/master-data`,
        update: `${apiPrfix}/masterData/master-data`,
        delete: `${apiPrfix}/masterData/master-data/`,
        get: `${apiPrfix}/masterData/master-data/get/`,
        getAll: `${apiPrfix}/masterData/master-data`,
        search: `${apiPrfix}/masterData/master-data/search`,
        getByMasterDataType: `${apiPrfix}/masterData/master-data/get/by-type?masterDataType=`,
        getByMasterDataTypes: `${apiPrfix}/masterData/master-data/get/by-types`,
        addDataType: `${apiPrfix}/masterData/master-data-type`,
        updateDataType: `${apiPrfix}/masterData/master-data-type`,
        deleteDataType: `${apiPrfix}/masterData/master-data-type/`,
        getDataType: `${apiPrfix}/masterData/master-data-type/get/`,
        getAllDataType: `${apiPrfix}/masterData/master-data-type`,
        searchDataType: `${apiPrfix}/masterData/master-data-type/search`,
        addJourney: `${apiPrfix}/masterData/master-journey`,
        updatJourney: `${apiPrfix}/masterData/master-journey`,
        deleteJourney: `${apiPrfix}/masterData/master-journey/`,
        getJourney: `${apiPrfix}/masterData/master-journey/get/`,
        getAllJourney: `${apiPrfix}/masterData/master-journey`,
        searchJourney: `${apiPrfix}/masterData/master-journey/search`,
    },
    customerController:{
        add: `${apiPrfix}/customer`,
        update: `${apiPrfix}/customer`,
        delete: `${apiPrfix}/customer/`,
        get: `${apiPrfix}/customer/get/`,
        getAll: `${apiPrfix}/customer`,
        search: `${apiPrfix}/customer/search`,
    },
    logisticRegionController:{
        add: `${apiPrfix}/logisticRegion`,
        update: `${apiPrfix}/logisticRegion`,
        delete: `${apiPrfix}/logisticRegion/`,
        get: `${apiPrfix}/logisticRegion/get/`,
        getAll: `${apiPrfix}/logisticRegion`,
        search: `${apiPrfix}/logisticRegion/search`,
    },
    shipmentController:{
        create: `${apiPrfix}/shipment`,
        update: `${apiPrfix}/shipment`,
        delete: `${apiPrfix}/shipment/`,
        get: `${apiPrfix}/shipment/get/`,
        getByIds: `${apiPrfix}/shipment/get/by-ids/`,
        getTrackingByShipmentId: `${apiPrfix}/shipment/get/tracking`,
        getAll: `${apiPrfix}/shipment`,
        search: `${apiPrfix}/shipment/search`,
    },
    memberController:{
        add: `${apiPrfix}/members`,
        update: `${apiPrfix}/members`,
        delete: `${apiPrfix}/members/`,
        get: `${apiPrfix}/members/get/`,
        getAll: `${apiPrfix}/members`,
        search: `${apiPrfix}/members/search`,
        activeDeactive: `${apiPrfix}/members/update/active/`,
        changeStation: `${apiPrfix}/members/update/station/`,
        changeRole: `${apiPrfix}/members/update/role/`,
        resetPassword: `${apiPrfix}/members/password/reset/`,
        changePassword: `${apiPrfix}/members/password/change`,
    }
}