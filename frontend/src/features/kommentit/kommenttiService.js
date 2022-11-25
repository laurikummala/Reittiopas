import axios from 'axios'

const API_URL = '/api/reitit/'

// Luo uusi kommentti
export const luoKommentti = async (kommenttiData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, kommenttiData, config)

  return response.data
}

// Hae käyttäjän kommentit
export const haeKommentit = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Päivitä kommentti

export const paivitaKommentti = async (commentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.update(API_URL, commentId, config)

  return response.data
}

// Poista käyttäjän kommentti
export const poistaKommentti = async (commentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(API_URL + commentId, config)

  return response.data
}

const kommenttiService = {
  luoKommentti,
  haeKommentit,
  paivitaKommentti,
  poistaKommentti,
}

export default kommenttiService