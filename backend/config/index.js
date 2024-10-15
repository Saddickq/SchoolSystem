import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL
const SECRET = process.env.SECRET
const EML_PASS = process.env.EML_PASS
const EMAIL = process.env.EMAIL


export { PORT, DB_URL, SECRET, EML_PASS, EMAIL }
