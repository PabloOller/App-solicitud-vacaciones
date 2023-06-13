var sql = require('mssql'); // MS Sql Server client
var sqlConfig = {
    user: 'sa',
    password: 'Skrillex21Savage!',
    server: 'localhost',
    database: 'Vacaciones',
    port: 1433,
    dialect: "mssql",
    options: {
        encrypt: false,
        enableArithAbort: true,
        trustServerCertificate: true

    }


}

async function myQuery(strsql) {
    console.log('SQL =>', strsql);
    var resul;
    await sql.connect(sqlConfig).then(async strResult => {
        /*     console.log('query solicitada2', strResult) */
        var request = new sql.Request();
        resul = await request.query(strsql).then(reqResult => {
            /*     console.log('reqResult',reqResult); */
            this.result = reqResult;
            return (reqResult);
        }).catch(reqError => {
            console.log('Error', reqError);
        });
        /*    console.log('hola',resul) */
        return this.resul;
    }).catch(sqlError => {
        console.log('sqlError', sqlError);
    });
    return (resul)
}
exports.myQuery = myQuery;
