import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constans'
import { type FromLanguage, type Language } from '../types'

type Props =
  | { type: 'from', value: FromLanguage, onChange: (l: FromLanguage) => void }
  | { type: 'to', value: Language, onChange: (l: Language) => void }

export const LanguageSelector = ({ onChange, type, value }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as Language)
  }

  return (
    <Form.Select aria-label='Selected language' onChange={handleChange} value={value}>
      {type === 'from' && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, language]) => (
        <option key={key} value={key}>
          {language}
        </option>
      ))}
    </Form.Select>
  )
}
