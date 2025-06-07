const axios = require('axios');


// Creating Jobseeker Profile
async function submitJobseekerProfile(profileData) {
    const formData = new FormData();

    // Append form data
    for (const [key, value] of Object.entries(profileData)) {
        if (value instanceof File) {
            formData.append(key, value);
        } else {
            formData.append(key, value);
        }
    }

    try {
        const response = await axios.post('http://127.0.0.1:8000/jobseeker/profile', formData, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        });

        console.log(response.data); // Log the response data
    } catch (error) {
        console.error('Error submitting jobseeker profile:', error.response ? error.response.data : error.message);
    }
}

// Example usage
const profileData = {
    first_name: 'John',
    last_name: 'Doe',
    phone_number: '1234567890',
    work_experience: '5 years in software development',
    education_level: 'Bachelor\'s Degree',
    user_id: 1,
    profile_pic: new File([''], 'profile_pic.png', { type: 'image/png' }), // Replace with actual file
    resume: new File([''], 'resume.png', { type: 'image/png' }) // Replace with actual file
};

//submitJobseekerProfile(profileData);


// Get Jobseeker Profile detail
async function getJobseekerProfile(userId) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/jobseeker/profile`, {
            params: {
                user_id: userId
            },
            headers: {
                'accept': 'application/json'
            }
        });

        console.log(response.data); // Log the response data
    } catch (error) {
        console.error('Error fetching jobseeker profile:', error.response ? error.response.data : error.message);
    }
}

// Example usage
getJobseekerProfile(3);


// Get Jobseeker Resume
async function getJobseekerResume(userId) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/jobseeker/profile/${userId}/resume`, {
            headers: {
                'accept': 'application/json'
            }
        });

        console.log(response.data); // Log the response data
    } catch (error) {
        console.error('Error fetching jobseeker resume:', error.response ? error.response.data : error.message);
    }
}

// Example usage
getJobseekerResume(3);


// Get Jobseeker profile Image
async function getJobseekerProfileImage(userId) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/jobseeker/profile/${userId}/image`, {
            headers: {
                'accept': 'application/json'
            }
        });

        console.log(response.data); // Log the response data
    } catch (error) {
        console.error('Error fetching jobseeker profile image:', error.response ? error.response.data : error.message);
    }
}

// Example usage
getJobseekerProfileImage(3);


