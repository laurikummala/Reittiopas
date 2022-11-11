import axios from 'axios'

const API_URL = '/api/kommentit/'

// Luo uusi kommentti
const luoKommentti = async (kommenttiData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, kommenttiData, config)

  return response.data
}

// Hae käyttäjän kommentit
const haeKommentit = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Poista käyttäjän kommentti
const poistaKommentti = async (kommenttiId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(API_URL + kommenttiId, config)

  return response.data
}


const kommenttiService = {
  luoKommentti,
  haeKommentit,
  poistaKommentti,
}

export default kommenttiService