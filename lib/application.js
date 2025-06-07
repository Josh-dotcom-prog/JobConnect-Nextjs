const axios = require('axios');

async function createApplication(applicationData) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/application/create', applicationData, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log(response.data); // Log the response data
    } catch (error) {
        console.error('Error creating application:', error.response ? error.response.data : error.message);
    }
}

// Example usage
const applicationData = {
    jobseeker_id: 1,
    job_id: 4,
    status: 'pending'
};

createApplication(applicationData);


// Get All Applications

async function getAllApplications() {
    try {
        const response = await axios.get('http://127.0.0.1:8000/application/all', {
            headers: {
                'accept': 'application/json'
            }
        });

        console.log(response.data); // Log the response data
    } catch (error) {
        console.error('Error fetching all applications:', error.response ? error.response.data : error.message);
    }
}

// Example usage
getAllApplications();


// Get all my applications

async function getMyApplications(jobseekerId) {
    try {
        const response = await axios.get('http://127.0.0.1:8000/application/me', {
            params: {
                jobseeker_id: jobseekerId
            },
            headers: {
                'accept': 'application/json'
            }
        });

        console.log(response.data); // Log the response data
    } catch (error) {
        console.error('Error fetching my applications:', error.response ? error.response.data : error.message);
    }
}

// Example usage
getMyApplications(1);

