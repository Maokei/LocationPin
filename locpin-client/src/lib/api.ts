export const apiLogin = async   (usernameOrEmail: string , password: string) : Promise<object> => {
  return await fetch('http://localhost:8080/api/auth/signin', {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      usernameOrEmail,
      password
    })
  }).then(res => res.json())
    .catch(error => {console.error(error)})
}

export const fakeAuth = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve('2342f2f1d131rf12'), 250);
  });