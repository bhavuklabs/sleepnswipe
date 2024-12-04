type UserData = {
    email: string;
    password: string;
    name?: string;
  };
  
  type StorageType = "login" | "signup";
  
  const storeUserData = (type: StorageType, data: UserData) => {
    const storageKey = type === "login" ? "loginDetails" : "signupDetails";
    const existingData = JSON.parse(localStorage.getItem(storageKey) || "[]");
    localStorage.setItem(storageKey, JSON.stringify([...existingData, data]));
  };
  
  const getUserData = (type: StorageType): UserData[] => {
    const storageKey = type === "login" ? "loginDetails" : "signupDetails";
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  };
  
  const clearUserData = (type: StorageType) => {
    const storageKey = type === "login" ? "loginDetails" : "signupDetails";
    localStorage.removeItem(storageKey);
  };
  
  export { storeUserData, getUserData, clearUserData };
  