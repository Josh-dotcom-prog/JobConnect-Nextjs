const axios = require('axios');


// Create Job

async function createJob(jobData) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/Jobs/create', jobData, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log(response.data); // Log the response data
    } catch (error) {
        console.error('Error creating job:', error.response ? error.response.data : error.message);
    }
}

// Example usage
const jobData = {
    employer_id: 1,
    title: 'Software Engineer',
    job_type: 'full_time',
    base_salary: 60000,
    description: 'Responsible for developing software solutions.',
    responsibilities: 'Write code, test software, and collaborate with team.',
    requirements: 'Bachelor\'s degree in Computer Science or related field.',
    location: 'Remote'
};

createJob(jobData);


// Get all Jobs

async function getAllJobs() {
    try {
        const response = await axios.get('http://127.0.0.1:8000/Jobs/all', {
            headers: {
                'accept': 'application/json'
            }
        });

        console.log(response.data); // Log the response data
    } catch (error) {
        console.error('Error fetching all jobs:', error.response ? error.response.data : error.message);
    }
}

// Example usage
getAllJobs();



// Get Job Details

async function getJobById(jobId) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/Jobs/${jobId}`, {
            headers: {
                'accept': 'application/json'
            }
        });

        console.log(response.data); // Log the response data
    } catch (error) {
        console.error('Error fetching job details:', error.response ? error.response.data : error.message);
    }
}

// Example usage
getJobById(1);