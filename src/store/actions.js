const req = require.context('.', true, /\.\/.+\/actions\.js$/)

req.keys().forEach((key) => {
  const actions = req(key)

  Object.keys(actions).forEach((name) => {
    module.exports[name] = actions[name]
  })
})

// export const fetchBooths = () => {
//   const request = axios.get('/api/read')
//   return { type: 'FETCH_BOOTHS', payload: request }
// }
