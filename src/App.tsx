import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from './hooks/useStore'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'

import { LanguageSelector } from './components/LanguaheSelector'
import { AUTO_LANGUAGE } from './constans'
import { ArrosIcon } from './components/Icons'
import { TextArea } from './components/TextArea'
import './App.css'

function App () {
  const {
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    fromLanguage,
    setFromText,
    toLanguage,
    setResult,
    fromText,
    loading,
    result
  } = useStore()

  return (
    <Container fluid>
      <h1>Byhako Translate</h1>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type='from'
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              type='from'
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>

        <Col xs='auto'>
          <Button
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
            variant='link'
          >
            <ArrosIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type='to'
              value={toLanguage}
              onChange={setToLanguage}
            />
            <TextArea
              type='to'
              loading={loading}
              value={result}
              onChange={setResult}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
