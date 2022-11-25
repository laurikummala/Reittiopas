import axios from 'axios'

const API_URL = '/api/reitit/'


// Luo uusi reitti
const luoReitti = async (reittiData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, reittiData, config)

  return response.data
}


// Hae käyttäjän reitit
const haeReitit = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Hae kaikki käyttäjän reitit
const haeKaikkiReitit = async () => {
  

  const response = await axios.get(API_URL)

  return response.data
}


// Hae käyttäjän tietty reitti id-numerolla
const haeReitti = async (reittiId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL + reittiId, config)

  return response.data
}


// Poista käyttäjän reitti
const poistaReitti = async (reittiId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(API_URL + reittiId, config)

  return response.data
}


const reittiService = {
  luoReitti,
  haeReitit,
  haeKaikkiReitit,
  haeReitti,
  poistaReitti,
}

export default reittiService