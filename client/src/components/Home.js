import { useState, useEffect } from 'react'

import Operations from './Operations'
import TableDisplay from './TableDisplay'
import warehouseService from '../services/warehouse'

const Home = () => {
  const [data, setData] = useState([])


  useEffect(() => {
    warehouseService.getAll().then(returnedData => {
      setData(returnedData)
    })
  }, [])

  return(
    <div>
      <Operations />
      <TableDisplay rows={data} />
    </div>
  )
}

export default Home