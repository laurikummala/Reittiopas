export const getComments = async () => {
  return [
    {
      id: "",
      teksti: "",
      username: "",
      userId: "",
      parentId: "",
      createdAt: "",
    },

  ];
};

export const createComment = async ( text, parentId = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    teksti: text,
    parentId,
    userId: "1",
    username: "John",
    createdAt: new Date().toISOString(),
  };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};
