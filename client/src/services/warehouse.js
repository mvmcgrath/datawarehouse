import axios from 'axios'
const baseUrl = '/api/warehouse'

const getAll = async () => {
  const queryObject = {
    sqlStatement: 'SELECT * FROM graduate INNER JOIN `time` ON `time`.TimeID = graduate.TimeID INNER JOIN person ON person.PersonID = graduate.PersonID INNER JOIN degree ON degree.DegreeID = graduate.DegreeID;'
  }
  const response = await axios.post(baseUrl, queryObject)
  return response.data
}

const getCuboid = async (queryObject) => {
  const response = await axios.post(baseUrl, queryObject)
  return response.data
}

const changeCuboid = async (cuboidObject) => {
  console.log(cuboidObject)
}

export default { getAll, getCuboid, changeCuboid }