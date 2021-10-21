import axios from "axios";

const baseUrl = `http://localhost:3001`

const getAll = async () => {
    let url = `${baseUrl}/getAllUsers`
    return await axios.get(url).then(response => response).catch(err => err.response)
}


const update = async (data) => {
    let url = `${baseUrl}/updateUser`
    return await axios.post(url, data).then(response => response).catch(err => err.response)
}

const insertUser = async (data) => {
    // console.log("test " + data)
    let url = `${baseUrl}/insertUser`
    return await axios.post(url, data).then(response => response).catch(err => err.response)


}


const deleteUser = async (data) => {
    let url = `${baseUrl}/deleteUser`;
    return await axios.post(url, data).then(response => response).catch(err => err.response)

}


const getAllCountry = async () => {
    let url = `${baseUrl}/getAllCountry`
    return await axios.get(url).then(response => response).catch(err => err.response)
}


const getAllContinent = async () => {
    let url = `${baseUrl}/getAllContinent`
    return await axios.get(url).then(response => response).catch(err => err.response)

}

const getAllContinentPoint = async () => {
    let url = `${baseUrl}/getAllContinentPoint`
    return await axios.get(url).then(response => response).catch(err => err.response)

}

const getOrders = async () => {
    let url = `${baseUrl}/loadOrders`
    return await axios.get(url).then(response => response).catch(err => err.response)
}

const loadCustomers = async () => {
    let url = `${baseUrl}/loadCustomers`
    return await axios.get(url).then(response => response).catch(err => err.response)
}





export {
    getAll,
    update,
    insertUser,
    deleteUser,
    getAllCountry,
    getAllContinent,
    getAllContinentPoint,
    // getCountryCode,
    getOrders,
    loadCustomers,
}