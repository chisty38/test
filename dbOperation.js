const sql = require('mssql');
var config = require('./dbconfig');

//View Sales Log by Date Range
async function getSalesReportLogByDate(from, to){
    try {
        // connect to your database
        let pool = await sql.connect(config);
        let shipmentStatusByDate =  await pool.request()
        .input('FromDate', sql.VarChar, from)
        .input('ToDate', sql.VarChar, to)
        .execute('Proc_GetShipmentStatusByDateRange');
        return shipmentStatusByDate.recordset;
    } catch (err) {
        // ... error checks
            console.log('This is Error from Proc_GetShipmentStatusByDateRange procedure');
            console.log(err);
            console.dir(err);
    }
}

module.exports ={
    getSalesReportLogByDate :getSalesReportLogByDate
}