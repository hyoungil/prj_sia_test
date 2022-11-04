import { getFetchWithDelay } from './fetch';
import { putFetchWithDelay } from './fetch';
const url = "https://dummyjson.com/product"


// fetch('https://dummyjson.com/products')
// .then(res => res.json())
// .then(console.log);
            
const getfakeData = () => getFetchWithDelay(url+" /api/get_viewData");
const putLabelBox = (param) => putFetchWithDelay(url + '/api/library', param);
const getImageUnitDate = (param) => getFetchWithDelay(url + '/api/unit_data?imgIdx=' + param);

export const userAPI = {
    getfakeData,
    putLabelBox,
    getImageUnitDate,
};