const filterCuboid = (cuboid) => {
  for (let operationKey in cuboid) {
    const operationObject = cuboid[operationKey]
    for (let [columnKey, flag] of Object.entries(operationObject)) {
      if (!flag || flag === 'None') {
        delete operationObject[columnKey]
      }
    }

    if (Object.keys(operationObject).length === 0) {
      delete cuboid[operationKey]
    }
  }

  return cuboid
}

const createQuery = (cuboid) => {
  const dimensionColumn = {
    'diceDays': 'Date',
    'diceMonths': 'Date',
    'diceYears': 'Date',
    'diceSeasons': 'Date',
    'diceName': 'Name',
    'diceStatus': 'Status',
    'diceAddress': 'Address',
    'diceGPA': 'GPA',
    'diceMajor': 'Major',
    'diceCollege': 'College',
    'diceDegreeName': 'DegreeName',
    'sliceDays': 'Date',
    'sliceMonths': 'Date',
    'sliceYears': 'Date',
    'sliceSeasons': 'Date',
    'sliceName': 'Name',
    'sliceStatus': 'Status',
    'sliceAddress': 'Address',
    'sliceGPA': 'GPA',
    'sliceMajor': 'Major',
    'sliceCollege': 'College',
    'sliceDegreeName': 'DegreeName'
  }

  const dimensions = {
    'Date': 'Time',
    'Name': 'Person',
    'Status': 'Person',
    'Address': 'Person',
    'GPA': 'Degree',
    'Major': 'Degree',
    'College': 'Degree',
    'DegreeName': 'Degree'
  }

  const dimensionsColumns = {
    'Time': ['Date', 'graduate.TimeID'],
    'Person': ['Name', 'Status', 'Address', 'graduate.PersonID'],
    'Degree': ['GPA', 'Major', 'College', 'DegreeName', 'graduate.DegreeID']
  }

  const dateFormatConversion = {
    'Day': '\'%D\'',
    'Month': '\'%M\'',
    'Year': '\'%Y\'',
    'diceDays': '\'%D\'',
    'diceMonths': '\'%M\'',
    'diceYears': '\'%Y\'',
    'sliceDays': '\'%D\'',
    'sliceMonths': '\'%M\'',
    'sliceYears': '\'%Y\'',
  }

  const diceConverter = {
    'Day': 'diceDays',
    'Month': 'diceMonths',
    'Year': 'diceYears',
    'Seasons': 'diceSeasons'
  }


  let columns = {
    'TableID': null,
    'graduate.GraduateID': null,
    'graduate.TimeID': null,
    'graduate.DegreeID': null,
    'graduate.PersonID': null,
    'Date': {},
    'Name': null,
    'Status': null,
    'Address': null,
    'GPA': null,
    'Major': null,
    'College': null,
    'DegreeName': null
  }

  let dateFormat = null
  let deleteDimension = null

  // Roll Up
  if (Object.hasOwn(cuboid, 'rollUp')) {
    const rollUpObject = cuboid['rollUp']
    if (Object.hasOwn(rollUpObject, 'rollUpTime')) {
      dateFormat = rollUpObject['rollUpTime']
    }

    if (Object.hasOwn(rollUpObject, 'rollUpDegree')) {
      if (rollUpObject['rollUpDegree'] === 'Major') {
        delete columns['College']
      } else {
        delete columns['Major']
      }
    }
  }

  // Roll Down
  if (Object.hasOwn(cuboid, 'rollDown')) {
    const rollDownObject = cuboid['rollDown']
    if (Object.hasOwn(rollDownObject, 'rollDownTime')) {
      dateFormat = rollDownObject['rollDownTime']
    }

    if (Object.hasOwn(rollDownObject, 'rollDownDegree')) {
      if (rollDownObject['rollDownDegree'] === 'Major') {
        delete columns['College']
      } else {
        delete columns['Major']
      }
    }
  }

  // Dice
  if (Object.hasOwn(cuboid, 'dice')) {
    const diceObject = cuboid['dice']

    for (let [key, value] of Object.entries(diceObject)) {
      const columnName = dimensionColumn[key]
      if (columnName === 'Date') {
        columns['Date'] = { ...columns['Date'], [key]: value }
      } else {
        columns[columnName] = value
      }
    }
  }

  // Slice
  if (Object.hasOwn(cuboid, 'slice')) {
    const sliceObject = cuboid['slice']

    for (let [key, value] of Object.entries(sliceObject)) {
      const columnName = dimensionColumn[key]
      deleteDimension = dimensions[columnName]
      if (columnName === 'Date') {
        columns['Date'] = { ...columns['Date'], [key.replace('slice', 'dice')]: value }
      } else {
        columns[columnName] = value
      }
    }
  }

  // Create SQL query
  const fromSection = ' FROM graduate INNER JOIN `time` ON `time`.TimeID = graduate.TimeID INNER JOIN person ON person.PersonID = graduate.PersonID INNER JOIN degree ON degree.DegreeID = graduate.DegreeID '

  // Roll Up and Roll Down Date Query
  if (dateFormat) {
    if (dateFormat !== 'Season') {
      const dateFormatConverted = dateFormatConversion[dateFormat]
      columns[`DATE_FORMAT(Date, ${dateFormatConverted}) as ${dateFormat}`] = columns['Date']
    } else {
      columns['CASE WHEN DATE_FORMAT(Date, \'%m\') > 11 THEN \'Winter\' WHEN DATE_FORMAT(Date, \'%m\') > 8 THEN \'Fall\' WHEN DATE_FORMAT(Date, \'%m\') > 5 THEN \'Summer\' ELSE \'Spring\' END AS Season'] = columns['Date']
    }

    delete columns['Date']
  }

  let whereSection = 'WHERE '

  // Dice/Slice
  for (let [columnKey, columnValue] of Object.entries(columns)) {
    if (typeof columnValue === 'object' && columnValue !== null && Object.keys(columnValue).length !== 0) {
      const dateFormatConverted = dateFormatConversion[dateFormat]
      if (columnKey !== 'Date') {
        if (isNaN(columnValue[diceConverter[dateFormat]])) {
          whereSection = whereSection.concat(`DATE_FORMAT(Date, ${dateFormatConverted}) = '${columnValue[diceConverter[dateFormat]]}' AND `)
        } else {
          whereSection = whereSection.concat(`DATE_FORMAT(Date, ${dateFormatConverted}) = ${columnValue[diceConverter[dateFormat]]} AND `)
        }
      } else {
        for (let [dateKey, dateValue] of Object.entries(columnValue)) {
          if (dateKey === 'diceSeasons') {
            whereSection = whereSection.concat(`CASE WHEN DATE_FORMAT(Date, '%m') > 11 THEN 'Winter' WHEN DATE_FORMAT(Date, '%m') > 8 THEN 'Fall' WHEN DATE_FORMAT(Date, '%m') > 5 THEN 'Summer' ELSE 'Spring' END = '${dateValue}' AND `)
          } else {
            if (isNaN(dateValue)) {
              whereSection = whereSection.concat(`DATE_FORMAT(Date, ${dateFormatConversion[dateKey]}) = '${dateValue}' AND `)
            } else {
              whereSection = whereSection.concat(`DATE_FORMAT(Date, ${dateFormatConversion[dateKey]}) = ${dateValue} AND `)
            }
          }
        }
      }
    } else if (typeof columnValue !== 'object' && columnValue !== null) {
      if (isNaN(columnValue)) {
        whereSection = whereSection.concat(`${columnKey} = '${columnValue}' AND `)
      } else {
        whereSection = whereSection.concat(`${columnKey} = ${columnValue} AND `)
      }
    }
  }

  if (deleteDimension) {
    for (let column of dimensionsColumns[deleteDimension]) {
      delete columns[column]
    }
  }

  let selectSection = 'SELECT '

  for (let key of Object.keys(columns)) {
    selectSection = selectSection.concat(`${key}, `)
  }

  selectSection = selectSection.slice(0, selectSection.length - 2)
  whereSection = whereSection.slice(0, whereSection.length - 4)

  if (whereSection === 'WH') {
    whereSection = ''
  }

  const overallQuery = selectSection.concat(fromSection).concat(whereSection)

  return overallQuery
}


export default { filterCuboid, createQuery }