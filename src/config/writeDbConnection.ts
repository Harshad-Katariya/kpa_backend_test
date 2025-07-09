import mysql from 'mysql2';
import dotenv from 'dotenv'

dotenv.config()
const connectionPool = mysql.createPool({
    connectionLimit: 2,
    multipleStatements: true,
    debug: false,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

class writeDb {
    private connection : any;

    // Start a transaction
    public async startTransaction(): Promise<void> {
        return new Promise((resolve, reject) => {
            connectionPool.getConnection((err, connection) => {
                if (err) {
                    console.log('Error getting connection from the pool:', err);
                    connection.destroy()
                    return reject(err);
                }

                this.connection = connection;
                console.log("start startTransaction")
                this.connection.beginTransaction((error) => {
                    if (error) {
                        console.error('Error starting transaction:', error);
                        connection.destroy();
                        return reject(error);
                    }
                    resolve();
                });
            });
        });
    }

    // Commit the transaction
    public async commit(): Promise<void> {
        return new Promise(async(resolve, reject) => {
            if(!this.connection){
                console.log("Transaction not started: proceeding without transaction.");
            }

            this.connection.commit((error) => {
                if (error) {
                    console.error('Error committing transaction:', error);
                    this.connection.rollback(() => {
                        this.connection.destroy();
                        return reject(error);
                    });
                } else {
                    this.connection.release(); // Release the connection back to the pool
                    this.connection = null; // Reset the connection reference
                    resolve();
                }
            });
        });
    }

    // Rollback the transaction
    public async rollback(): Promise<void> {
        if(!this.connection){
            console.log("Transaction not started: proceeding without transaction.");
        }else{
            return new Promise((resolve) => {
                this.connection.rollback(() => {
                    this.connection.release(); // Release the connection back to the pool
                    this.connection = null; // Reset the connection reference
                    resolve();
                });
            });
        }
    }

    // Insert data 
    public async insert(query: string, data: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.connection) {
                connectionPool.getConnection((err, connection) => {
                    if (err) {
                        console.log("error -> ", err)
                        connection.destroy()
                        reject(err)
                    }
                    connection.query(query, data, (error, results) => {
                        if (error) {
                            console.log("error -> ", error)
                            connection.destroy()
                            return reject(error)
                        }
                        connection.destroy()
                        return resolve(results)
                    })
                });
            } else {
                this.connection.query(query, data, async(error:any, results:any) => {
                    if (error) {
                        await this.rollback();
                        console.error("Error in insert query:", error);
                        return reject(error);
                    }
                    resolve(results);
                });
            }
        });
    }

    // Update data 
    public async update(query: string, data: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.connection) {
                connectionPool.getConnection((err, connection) => {
                    if (err) {
                        console.log("error -> ", err)
                        connection.destroy()
                        reject(err)
                    }
                    connection.query(query, data, (error, results) => {
                        if (error) {
                            console.log("error -> ", error)
                            connection.destroy()
                            return reject(error)
                        }
                        connection.destroy()
                        return resolve(results)
                    })
                });
            } else {
                this.connection.query(query, data,async (error, results) => {
                    if (error) {
                        await this.rollback();
                        console.error("Error in insert query:", error);
                        return reject(error);
                    }
                    resolve(results);
                });
            }
        });
    }

    // Delete data 
    public async delete(query: string, data: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.connection) {
                connectionPool.getConnection((err, connection) => {
                    if (err) {
                        console.log("error -> ", err)
                        connection.destroy()
                        reject(err)
                    }
                    connection.query(query, data, (error, results) => {
                        if (error) {
                            console.log("error -> ", error)
                            connection.destroy()
                            return reject(error)
                        }
                        connection.destroy()
                        return resolve(results)
                    })
                });
            } else {
                this.connection.query(query, data,async(error, results) => {
                    if (error) {
                        await this.rollback();
                        console.error("Error in insert query:", error);
                        return reject(error);
                    }
                    resolve(results);
                });
            }
        });
    }

    // select data 
     public async select(query: string, data: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.connection) {
                connectionPool.getConnection((err, connection) => {
                    if (err) {
                        console.log("error -> ", err)
                        connection.destroy()
                        reject(err)
                    }
                    connection.query(query, data, (error, results) => {
                        if (error) {
                            console.log("error -> ", error)
                            connection.destroy()
                            return reject(error)
                        }
                        connection.destroy()
                        return resolve(results)
                    })
                });
            } else {
                this.connection.query(query, data,async (error, results) => {
                    if (error) {
                        await this.rollback();
                        console.error("Error in select query:", error);
                        return reject(error);
                    }
                    resolve(results);
                });
            }
        });
    }

    // Execute master add single query
     public async set(query: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.connection) {
                connectionPool.getConnection((err, connection) => {
                    if (err) {
                        console.log("error -> ", err)
                        connection.destroy()
                        reject(err)
                    }
                    connection.query(query, (error, results) => {
                        if (error) {
                            console.log("error -> ", error)
                            connection.destroy()
                            return reject(error)
                        }
                        connection.destroy()
                        return resolve(results)
                    })
                });
            } else {
                this.connection.query(query,async(error, results) => {
                    if (error) {
                        await this.rollback();
                        console.error("Error in set query:", error);
                        return reject(error);
                    }
                    resolve(results);
                });
            }
        });
    }

}
export const writeConnection = new writeDb();