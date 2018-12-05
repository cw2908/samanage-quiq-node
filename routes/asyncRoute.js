/*eslint linebreak-style: ["error", "windows"]*/
const asyncRoute = route => (req, res, next = console.error) => {
  Promise.resolve(route(req, res)).catch(next)
}
module.exports = asyncRoute