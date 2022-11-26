import { Navbar, Container } from 'react-bootstrap'

const Navigation = () => {
  return(
    <Navbar collapseOnSelect expand="xxl" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="">OLAP Interface</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Navigation