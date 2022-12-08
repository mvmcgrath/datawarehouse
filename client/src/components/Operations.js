import { Container, Accordion, Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import { useState } from 'react'

const StyledContainer = styled(Container)`
  margin-top: 50px;
  border: 3px solid white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 50px;
  align-items: center;
  padding: 50px 0px;
`

const Operations = ({ handleCuboidChange }) => {
  const [rollUpTime, setRollUpTime] = useState(null)
  const [rollUpDegree, setRollUpDegree] = useState(null)
  const [rollDownTime, setRollDownTime] = useState(null)
  const [rollDownDegree, setRollDownDegree] = useState(null)
  const [diceDays, setDiceDays] = useState(null)
  const [diceMonths, setDiceMonths] = useState(null)
  const [diceYears, setDiceYears] = useState(null)
  const [diceSeasons, setDiceSeasons] = useState(null)
  const [diceName, setDiceName] = useState(null)
  const [diceStatus, setDiceStatus] = useState(null)
  const [diceAddress, setDiceAddress] = useState(null)
  const [diceGPA, setDiceGPA] = useState(null)
  const [diceMajor, setDiceMajor] = useState(null)
  const [diceCollege, setDiceCollege] = useState(null)
  const [diceDegreeName, setDiceDegreeName] = useState(null)
  const [sliceDays, setSliceDays] = useState(null)
  const [sliceMonths, setSliceMonths] = useState(null)
  const [sliceYears, setSliceYears] = useState(null)
  const [sliceSeasons, setSliceSeasons] = useState(null)
  const [sliceName, setSliceName] = useState(null)
  const [sliceStatus, setSliceStatus] = useState(null)
  const [sliceAddress, setSliceAddress] = useState(null)
  const [sliceGPA, setSliceGPA] = useState(null)
  const [sliceMajor, setSliceMajor] = useState(null)
  const [sliceCollege, setSliceCollege] = useState(null)
  const [sliceDegreeName, setSliceDegreeName] = useState(null)
  const [pivot, setPivot] = useState(false)

  const onUpdateCuboid = () => {
    const newCuboid = {
      rollUp: {
        rollUpTime,
        rollUpDegree
      },
      rollDown: {
        rollDownTime,
        rollDownDegree
      },
      dice: {
        diceDays,
        diceMonths,
        diceYears,
        diceSeasons,
        diceName,
        diceStatus,
        diceAddress,
        diceGPA,
        diceMajor,
        diceCollege,
        diceDegreeName
      },
      slice: {
        sliceDays,
        sliceMonths,
        sliceYears,
        sliceSeasons,
        sliceName,
        sliceStatus,
        sliceAddress,
        sliceGPA,
        sliceMajor,
        sliceCollege,
        sliceDegreeName
      },
      pivot: {
        pivot
      }
    }

    handleCuboidChange(newCuboid)
  }


  return(
    <StyledContainer className="bg-dark">
      <Accordion className="w-75">
        <Accordion.Item eventKey="0">
          <Accordion.Header className="bg-dark">Roll Up</Accordion.Header>
          <Accordion.Body>
            <div>
              <Form.Label>Time Hierarchy</Form.Label>
              <Form.Select className="bg-secondary w-25" onChange={({ target }) => setRollUpTime(target.value)}>
                <option>None</option>
                <option>Day</option>
                <option>Month</option>
                <option>Season</option>
                <option>Year</option>
              </Form.Select>
            </div>
            <div>
              <Form.Label>Degree Hierarchy</Form.Label>
              <Form.Select className="bg-secondary w-25" onChange={({ target }) => setRollUpDegree(target.value)}>
                <option>None</option>
                <option>Major</option>
                <option>College</option>
              </Form.Select>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Roll Down</Accordion.Header>
          <Accordion.Body>
            <div>
              <Form.Label>Time Hierarchy</Form.Label>
              <Form.Select className="bg-secondary w-25" onChange={({ target }) => setRollDownTime(target.value)}>
                <option>None</option>
                <option>Day</option>
                <option>Month</option>
                <option>Season</option>
                <option>Year</option>
              </Form.Select>
            </div>
            <div>
              <Form.Label>Degree Hierarchy</Form.Label>
              <Form.Select className="bg-secondary w-25" onChange={({ target }) => setRollDownDegree(target.value)}>
                <option>None</option>
                <option>Major</option>
                <option>College</option>
              </Form.Select>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Dice</Accordion.Header>
          <Accordion.Body>
            <Accordion>
              <Accordion.Item>
                <Accordion.Header>Time Dimension</Accordion.Header>
                <Accordion.Body>
                  <Form.Label>Days</Form.Label>
                  <Form.Control
                    type="text"
                    name="diceDays"
                    onChange={({ target }) => setDiceDays(target.value)}
                  />
                  <Form.Label>Months</Form.Label>
                  <Form.Control
                    type="text"
                    name="diceMonths"
                    onChange={({ target }) => setDiceMonths(target.value)}
                  />
                  <Form.Label>Years</Form.Label>
                  <Form.Control
                    type="text"
                    name="diceYears"
                    onChange={({ target }) => setDiceYears(target.value)}
                  />
                  <Form.Label>Seasons</Form.Label>
                  <Form.Control
                    type="text"
                    name="diceSeasons"
                    onChange={({ target }) => setDiceSeasons(target.value)}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>Person Dimension</Accordion.Header>
                <Accordion.Body>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="diceName"
                    onChange={({ target }) => setDiceName(target.value)}
                  />
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    type="text"
                    name="diceStatus"
                    onChange={({ target }) => setDiceStatus(target.value)}
                  />
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="diceAddress"
                    onChange={({ target }) => setDiceAddress(target.value)}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>Degree Dimension</Accordion.Header>
                <Accordion.Body>
                  <Form.Label>GPA</Form.Label>
                  <Form.Control
                    type="text"
                    name="diceGPA"
                    onChange={({ target }) => setDiceGPA(target.value)}
                  />
                  <Form.Label>Major</Form.Label>
                  <Form.Control
                    type="text"
                    name="diceMajor"
                    onChange={({ target }) => setDiceMajor(target.value)}
                  />
                  <Form.Label>College</Form.Label>
                  <Form.Control
                    type="text"
                    name="diceCollege"
                    onChange={({ target }) => setDiceCollege(target.value)}
                  />
                  <Form.Label>Degree Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="diceDegreeName"
                    onChange={({ target }) => setDiceDegreeName(target.value)}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Slice</Accordion.Header>
          <Accordion.Body>
            <Accordion>
              <Accordion.Item>
                <Accordion.Header>Time Dimension</Accordion.Header>
                <Accordion.Body>
                  <Form.Label>Days</Form.Label>
                  <Form.Control
                    type="text"
                    name="sliceDays"
                    onChange={({ target }) => setSliceDays(target.value)}
                  />
                  <Form.Label>Months</Form.Label>
                  <Form.Control
                    type="text"
                    name="sliceMonths"
                    onChange={({ target }) => setSliceMonths(target.value)}
                  />
                  <Form.Label>Years</Form.Label>
                  <Form.Control
                    type="text"
                    name="sliceYears"
                    onChange={({ target }) => setSliceYears(target.value)}
                  />
                  <Form.Label>Seasons</Form.Label>
                  <Form.Control
                    type="text"
                    name="sliceSeasons"
                    onChange={({ target }) => setSliceSeasons(target.value)}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>Person Dimension</Accordion.Header>
                <Accordion.Body>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="sliceName"
                    onChange={({ target }) => setSliceName(target.value)}
                  />
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    type="text"
                    name="sliceStatus"
                    onChange={({ target }) => setSliceStatus(target.value)}
                  />
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="sliceAddress"
                    onChange={({ target }) => setSliceAddress(target.value)}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>Degree Dimension</Accordion.Header>
                <Accordion.Body>
                  <Form.Label>GPA</Form.Label>
                  <Form.Control
                    type="text"
                    name="sliceGPA"
                    onChange={({ target }) => setSliceGPA(target.value)}
                  />
                  <Form.Label>Major</Form.Label>
                  <Form.Control
                    type="text"
                    name="sliceMajor"
                    onChange={({ target }) => setSliceMajor(target.value)}
                  />
                  <Form.Label>College</Form.Label>
                  <Form.Control
                    type="text"
                    name="sliceCollege"
                    onChange={({ target }) => setSliceCollege(target.value)}
                  />
                  <Form.Label>Degree Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="sliceDegreeName"
                    onChange={({ target }) => setSliceDegreeName(target.value)}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Pivot</Accordion.Header>
          <Accordion.Body>
            <Form.Label>Pivot</Form.Label>
            <Form.Check
              type="checkbox"
              name="pivot"
              onChange={({ target }) => setPivot(target.value)}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Button variant="primary" onClick={onUpdateCuboid}>
          Update
      </Button>
    </StyledContainer>
  )
}

export default Operations