const apiPrfix = "api/v1";
export const apiUrls = {
    authController: {
        getToken: `auth/login`,
    },
    masterDataController: {
        add: `${apiPrfix}/master-data`,
        update: `${apiPrfix}/master-data`,
        delete: `${apiPrfix}/master-data/`,
        get: `${apiPrfix}/master-data/get/`,
        getAll: `${apiPrfix}/master-data`,
        search: `${apiPrfix}/master-data/search`,
        getByMasterDataType: `${apiPrfix}/master-data/get/by-type`,
        getByMasterDataTypes: `${apiPrfix}/master-data/get/by-types`,
        addDataType: `${apiPrfix}/master-data-type`,
        updateDataType: `${apiPrfix}/master-data-type`,
        deleteDataType: `${apiPrfix}/master-data-type/`,
        getDataType: `${apiPrfix}/master-data-type/get/`,
        getAllDataType: `${apiPrfix}/master-data-type`,
        searchDataType: `${apiPrfix}/master-data-type/search`,
    },
}