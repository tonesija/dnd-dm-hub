import axios from 'axios'

console.log('Mode je: ' + process.env.NODE_ENV)
let baseURL = process.env.VUE_APP_ENV_BASE_URL
console.log('BaseURL za DnDAPI je: ' + baseURL)

//connection to DnDAPI
export default () => {
  return axios.create({
    baseURL: baseURL
  })
}