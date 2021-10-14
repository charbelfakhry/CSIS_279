
exports.convertDate = (fullDate) =>{

    let dt = new Date(fullDate);
    return dt.getFullYear() + "-" + Number(dt.getMonth() + 1) + "-" + dt.getDay();

}