import fs from 'fs'


const USERS_FILE = "./data.json";

// Class for read and write data from users.json file
// eslint-disable-next-line no-unused-vars
class file {
    //Read data from users.json
    readUsers() {
        const users = fs.readFileSync(USERS_FILE, 'utf-8')
        return JSON.parse(users)
    }
    // Write data users to file
    writeUsers = (users) => {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
    }
}


export default new file()