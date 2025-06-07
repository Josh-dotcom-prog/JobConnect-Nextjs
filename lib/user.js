const axios = require('axios');

// CreateUser
async function createUser(emailAddress, password) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/users', {
            email_address: emailAddress,
            password: password
        }, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log(response.data); // Log the response data
    } catch (error) {
        console.error('Error creating user:', error.response ? error.response.data : error.message);
    }
}

// Example usage
createUser('user@example.com', 'stringst');


// LoginUser
async function loginUser(emailAddress, password) {
    try {
        const response = await axios.patch('http://127.0.0.1:8000/login', {
            email_address: emailAddress,
            password: password
        }, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log(response.data); // Log the response data
    } catch (error) {
        console.error('Error logging in:', error.response ? error.response.data : error.message);
    }
}

// Example usage
loginUser('user@example.com', 'stringst');

// LogOut User
async function logoutUser(userId) {
    try {
        const response = await axios.patch(`http://127.0.0.1:8000/logout`, null, {
            params: {
                user_id: userId
            },
            headers: {
                'accept': 'application/json'
            }
        });

        console.log(response.data); // Log the response data
    } catch (error) {
        console.error('Error logging out:', error.response ? error.response.data : error.message);
    }
}

// Example usage
logoutUser(10);

// GetUserDetails
async function getUserDetails(userId) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/detail/${userId}`, {
            headers: {
                'accept': 'application/json'
            }
        });

        console.log(response.data); // Log the response data
    } catch (error) {
        console.error('Error fetching user details:', error.response ? error.response.data : error.message);
    }
}

// Example usage
getUserDetails(1);


// Get all users
async function getAllItems() {
    try {
        const response = await axios.get('http://127.0.0.1:8000/all', {
            headers: {
                'accept': 'application/json'
            }
        });

        console.log(response.data); // Log the response data
    } catch (error) {
        console.error('Error fetching all items:', error.response ? error.response.data : error.message);
    }
}

// Example usage
getAllItems();

// GetEmployer dashboard
async function getEmployerDashboard(userId) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/company/dashboard`, {
            params: {
                user_id: userId
            },
            headers: {
                'accept': 'application/json'
            }
        });
        return response.data; // Return the response data
    } catch (error) {
        console.error(error);
        throw error; // Optionally re-throw the error
    }
}

// Define other functions here
async function getJobListings() {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/jobs`, {
            headers: {
                'accept': 'application/json'
            }
        });
        return response.data; // Return the response data for job listings
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Export all functions
module.exports = {
    getEmployerDashboard,
    getJobListings,
    // Add other functions here as needed
};
// Example usage
getEmployerDashboard(1);