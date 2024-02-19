const fs = require('fs');
const path = require('path');

exports.readUsers = () => {
    try {
        const usersData = fs.readFileSync(path.resolve(__dirname, '../data/users.json'), 'utf8');
        return JSON.parse(usersData);
    } catch (error) {
        console.error('Error reading users data:', error);
        return [];
    }
}

exports.writeUsers = (users) => {
    try {
        fs.writeFileSync(path.resolve(__dirname, '../data/users.json'), JSON.stringify(users, null, 2));
        console.log('Users data written successfully');
    } catch (error) {
        console.error('Error writing users data:', error);
    }
}