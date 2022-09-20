export const saveToStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const readFromStorage = (key) => {
  const item = sessionStorage.getItem(key);

  if (item) {
    return JSON.parse(item);
  } else {
    return null;
  }
};

export const Channel = new BroadcastChannel("app-chats");
