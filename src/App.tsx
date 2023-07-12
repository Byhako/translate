import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from './hooks/useStore'
import { Container, Row, Col, Button } from 'react-bootstrap'

import { LanguageSelector } from './components/LanguaheSelector'
import { AUTO_LANGUAGE } from './constans'
import { ArrosIcon } from './components/Icons'
import './App.css'

function App () {
  const {
    fromLanguage,
    setFromLanguage,
    setToLanguage,
    toLanguage,
    interchangeLanguages
  } = useStore()

  return (
    <Container fluid>
      <h1>Byhako Translate</h1>

      <Row>
        <Col>
          <LanguageSelector
            type='from'
            value={fromLanguage}
            onChange={setFromLanguage}
          />
          {fromLanguage}
        </Col>
        <Col>
          <Button
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
            variant='link'
          >
            <ArrosIcon />
          </Button>
        </Col>
        <Col>
          <LanguageSelector
            type='to'
            value={toLanguage}
            onChange={setToLanguage}
          />
          {toLanguage}
        </Col>
      </Row>
    </Container>
  )
}

export default App
