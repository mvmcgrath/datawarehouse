import { Container, Accordion, Button } from 'react-bootstrap'
import styled from 'styled-components'

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

const Operations = () => {
  const onUpdate = () => {
    console.log('Hi')
  }


  return(
    <StyledContainer className="bg-dark">
      <Accordion className="w-75">
        <Accordion.Item eventKey="0">
          <Accordion.Header className="bg-dark">Roll Up</Accordion.Header>
          <Accordion.Body>
            Lol
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Roll Down</Accordion.Header>
          <Accordion.Body>
            Lol
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Dice</Accordion.Header>
          <Accordion.Body>
            Lol
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Slice</Accordion.Header>
          <Accordion.Body>
            Lol
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Pivot</Accordion.Header>
          <Accordion.Body>
            Lol
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Button variant="primary" onClick={onUpdate}>
          Update
      </Button>
    </StyledContainer>
  )
}

export default Operations