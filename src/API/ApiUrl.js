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
        getByMasterDataType: `${apiPrfix}/masterData/master-data/get/by-type`,
        getByMasterDataTypes: `${apiPrfix}/masterData/master-data/get/by-types`,
        addDataType: `${apiPrfix}/masterData/master-data-type`,
        updateDataType: `${apiPrfix}/masterData/master-data-type`,
        deleteDataType: `${apiPrfix}/masterData/master-data-type/`,
        getDataType: `${apiPrfix}/masterData/master-data-type/get/`,
        getAllDataType: `${apiPrfix}/masterData/master-data-type`,
        searchDataType: `${apiPrfix}/masterData/master-data-type/search`,
    },
    customerController:{
        add: `${apiPrfix}/customer`,
        update: `${apiPrfix}/customer`,
        delete: `${apiPrfix}/customer/`,
        get: `${apiPrfix}/customer/get/`,
        getAll: `${apiPrfix}/customer`,
        search: `${apiPrfix}/customer/search`,
    }
}