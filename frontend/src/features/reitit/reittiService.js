import axios from 'axios'

const API_URL = '/api/reitit/'

// Create new reitti
const createReitti = async (reittiData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, reittiData, config)

  return response.data
}

// Get user reitit
const getReitit = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user reitti
const deleteReitti = async (reittiId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + reittiId, config)

  return response.data
}

const reittiService = {
  createReitti,
  getReitit,
  deleteReitti,
}

export default reittiService




// // import axios from 'axios'

// // const API_URL = '/api/reitit/'


// // //create new goal ( reitti)
// // const createReitti = async (reittiData, token) => {
// //     const config = {
// //         headers: {
// //             Authorization: `Bearer ${token}`        // backtics
// //         }
// //     }

// //     const response = await axios.post(API_URL, reittiData, config)

// //     return response.data
// // }
// // //get user goals ( reitti)
// // const getReitit = async (token) => {
// //     const config = {
// //         headers: {
// //             Authorization: `Bearer ${token}`        // backtics
// //         }
// //     }

// //     const response = await axios.get(API_URL, config)

// //     return response.data
// // }

// // //delete reitti
// // const deleteReitti = async (reittiId, token) => {
// //     const config = {
// //         headers: {
// //             Authorization: `Bearer ${token}`        // backtics
// //         },
// //     }

// //     const response = await axios.delete(API_URL + reittiId, config)

// //     return response.data
// // }

// // const reittiService = {
// //     createReitti,
// //     getReitit,
// //     deleteReitti,
// // }

// // export default reittiService