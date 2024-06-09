// import initSqlJs, { type Database, type SqlJsStatic } from "sql.js";
import initSqlJs, { type Database, type SqlJsStatic } from "sql.js";


let SQL: SqlJsStatic

/**
 * @link https://sql.js.org/#/?id=usage
 * @param initSql 
 * @returns 
 * 还可以加载远程db文件
 * const buf = await fetch("/sql1.db").then((res) => res.arrayBuffer());
 * const db = new SQL.Database(new Uint8Array(buf));
 */
export const initDB = async (initSql?: string) => {
    if (!SQL) {
        console.log('before init db')
        SQL = await initSqlJs({
            locateFile: () => '/node_modules/sql.js/dist/sql-wasm.wasm'
        })
        console.log(SQL, 'sql')
    }

    const db = new SQL.Database()
    if (initSql) {
        db.run(initSql)
    }
    return db
}

/**
 * @param db 
 * @param sql 
 * @returns 
 */
export const runSQL = (db: Database, sql: string) => {
    return db.exec(sql)
}