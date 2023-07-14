import { useEffect } from 'react'
import { translate } from './services/traslate'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from './hooks/useStore'
import { useDebounce } from './hooks/useDebounce'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'

import { LanguageSelector } from './components/LanguaheSelector'
import { AUTO_LANGUAGE, VOICE_LANGUAGES } from './constans'
import { ArrosIcon, CopyIcon, SpeakerIcon } from './components/Icons'
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

  const debounceText = useDebounce(fromText)

  useEffect(() => {
    if (fromText === '') return

    translate({ fromLanguage, toLanguage, text: debounceText })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => setResult('Error'))
  }, [debounceText, fromLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleSpeaker = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_LANGUAGES[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

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
            <div style={{ position: 'relative' }}>
              <TextArea
                type='to'
                loading={loading}
                value={result}
                onChange={setResult}
              />
              <Button
                variant='link'
                style={{ position: 'absolute', right: -40, top: 0 }}
                onClick={handleClipboard}
              >
                <CopyIcon />
              </Button>
              <Button
                variant='link'
                style={{ position: 'absolute', right: -40, top: 30 }}
                onClick={handleSpeaker}
              >
                <SpeakerIcon />
              </Button>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
