const phoneRegexp = /\+1(\d{3})(\d{3})(\d{4})/;
export const formatPhone = (phoneNumber: string): string => {
  const results: string[] | null = phoneRegexp.exec(phoneNumber);
  if (results) {
    return `${results[1]}-${results[2]}-${results[3]}`;
  } else {
    return "error!";
  }
};

export const URL = {
    list: `${import.meta.env.VITE_BACKEND_HOST}/users/`,
    show: (id?: string) => `${import.meta.env.VITE_BACKEND_HOST}/users/${id || ""}/`
}

export const Roles = {
    USER: 1,
    ADMIN: 2
}