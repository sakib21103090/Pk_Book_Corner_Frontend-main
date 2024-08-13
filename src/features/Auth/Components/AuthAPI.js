export function CreateUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function LoginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { 'content-type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const err = await response.json();
        reject({ err });
      }
    } catch (err) {
      reject({ err });
    }
  });
}

export function SignOut(userId) {
  return new Promise(async (resolve) => {
  // todo on server we will remove user section information
    resolve({ data:'success' });
  });
}

