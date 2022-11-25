export const haeKommentit = async () => {
  return [
    
  ];
};

export const luoKommentti = async ( text, parentId = null) => {
  const user = JSON.parse(localStorage.getItem('user')) // Tällä koodirivillä sai haettua kommenttiin kirjautuneen käyttäjän nimen
  return {
    id: Math.random().toString(36).substr(2, 9),
    teksti: text,
    parentId,
    userId: user._id,
    user: user.name,
    createdAt: new Date().toISOString(),
  };
};

export const paivitaKommentti = async (text) => {
  return { text };
};

export const poistaKommentti = async () => {
  return {};
};
