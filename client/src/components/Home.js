import { useState, useEffect } from 'react'

import Operations from './Operations'
//import warehouseService from '../services/warehouse'

const Home = () => {
  const [data, setData] = useState([])


  useEffect(() => {
    setData([])
  }, [])

  console.log(data)

  return(
    <Operations />
  )
}

export default Home