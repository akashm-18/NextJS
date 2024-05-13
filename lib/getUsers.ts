export default async function getUsers() {

  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!res.ok) throw new Error('Failed to Fetch data')
  return res.json() 
}
