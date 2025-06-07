const axios = require('axios');


// Create Company Profile
async function submitCompanyProfile(profileData) {
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
        const response = await axios.post('http://127.0.0.1:8000/company/profile', formData, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        });

        console.log(response.data); // Log the response data
    } catch (error) {
        console.error('Error submitting company profile:', error.response ? error.response.data : error.message);
    }
}

// Example usage
const profileData = {
    user_id: 1,
    company_name: 'Example Company',
    company_description: 'A brief description of the company.',
    company_phone: '123-456-7890',
    company_location: 'New York, NY',
    profile_pic: new File([''], 'profile_pic.png', { type: 'image/png' }) // Replace with actual file from input
};

// Call the function with actual file input
// submitCompanyProfile(profileData);


// Get Company Image
async function getCompanyProfileImage(companyId) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/company/profile/${companyId}/image`, {
            headers: {
                'accept': 'application/json'
            }
        });

        console.log(response.data); // Log the response data
    } catch (error) {
        console.error('Error fetching company profile image:', error.response ? error.response.data : error.message);
    }
}

// Example usage
// getCompanyProfileImage(1);


// Get company dash board
async function getCompanyDashboard(userId) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/company/dashboard`, {
            params: {
                user_id: userId
            },
            headers: {
                'accept': 'application/json'
            }
        });

        console.log(response.data); // Log the response data
        return response.data; // Return the data for further processing if needed
    } catch (error) {
        // console.error('Error fetching company dashboard:', error.response ? error.response.data : error.message);
        console.log(error);
        throw new Error('Failed to fetch company dashboard');
    }
}

// Example usage
getCompanyDashboard(1);


// Get CompanyApplicants
async function getCompanyApplicants(userId) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/company/applicants`, {
            params: {
                user_id: userId
            },
            headers: {
                'accept': 'application/json'
            }
        });

        console.log(response.data); // Log the response data
    } catch (error) {
        console.error('Error fetching company applicants:', error.response ? error.response.data : error.message);
    }
}

// Example usage
// getCompanyApplicants(1);


// Get Application detail
async function getApplicantDetail(companyId, applicantId) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/company/applicants/detail/${companyId}/${applicantId}`, {
            headers: {
                'accept': 'application/json'
            }
        });

        console.log(response.data); // Log the response data
    } catch (error) {
        console.error('Error fetching applicant detail:', error.response ? error.response.data : error.message);
    }
}

// Example usage
// getApplicantDetail(1, 1);


// Update application status
async function updateApplicantStatus(companyId, applicantId, status) {
    try {
        const response = await axios.patch(`http://127.0.0.1:8000/company/applicants/update/${companyId}/${applicantId}`, null, {
            params: {
                app_status: status
            },
            headers: {
                'accept': 'application/json'
            }
        });

        console.log(response.data); // Log the response data
    } catch (error) {
        console.error('Error updating applicant status:', error.response ? error.response.data : error.message);
    }
}

// Example usage
// updateApplicantStatus(1, 1, 'rejected');

exports = {
    submitCompanyProfile,
    getCompanyProfileImage,
    getCompanyDashboard,
    getCompanyApplicants,
    getApplicantDetail,
    updateApplicantStatus
};
module.exports = {
    submitCompanyProfile,
    getCompanyProfileImage,
    getCompanyDashboard,
    getCompanyApplicants,
    getApplicantDetail,
    updateApplicantStatus
};