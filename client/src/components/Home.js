import { useState, useEffect } from 'react'

import Operations from './Operations'
import TableDisplay from './TableDisplay'
import warehouseService from '../services/warehouse'
import cuboidService from '../services/cuboid'

const Home = () => {
  const [data, setData] = useState([])


  useEffect(() => {
    warehouseService.getAll().then(returnedData => {
      setData(returnedData)
    })
  }, [])

  const handleCuboidChange = async (cuboid) => {
    const filteredCuboid = cuboidService.filterCuboid(cuboid)
    console.log(filteredCuboid)
    const sqlQuery = cuboidService.createQuery(filteredCuboid)
    console.log(sqlQuery)
    const returnedData = await warehouseService.getCuboid({ sqlStatement: sqlQuery })
    console.log(returnedData)
    setData(returnedData)
  }

  return(
    <div>
      <Operations handleCuboidChange={handleCuboidChange}/>
      <TableDisplay rows={data} />
    </div>
  )
}

export default Home