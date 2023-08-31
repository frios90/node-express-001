import pkg from 'pg';
const {Pool} = pkg;

export let pgsql = null;

export const connectionPgsql = async () => {
    try {
        pgsql = new Pool({
            host: process.env.DB_HOST,
            user:  process.env.DN_USER,
            password:  process.env.DB_PASS,
            database:  process.env.DB_NAME,
            port:  process.env.DB_PORT
        })

    } catch (error) {
        return { error: error.message };
    }
}
