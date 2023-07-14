import { Form } from 'react-bootstrap'

interface Props {
  type: 'from' | 'to'
  loading?: boolean
  value: string
  onChange: (v: string) => void
}

const commonStyles = { border: 0, height: '200px', resize: 'none' }

const getPlaceholder = (type: 'from' | 'to', loading?: boolean) => {
  if (type === 'from') return 'Enter text'
  if (loading === true) return 'Loading...'
  return 'Translation'
}

export const TextArea = ({
  type,
  loading,
  value,
  onChange
}: Props) => {
  const styles = type === 'to'
    ? { ...commonStyles, backgroundColor: '#dadada' }
    : { ...commonStyles, backgroundColor: '#ececec' }

  return (
    <Form.Control
      as='textarea'
      autoFocus={type === 'from'}
      disabled={type === 'to'}
      placeholder={getPlaceholder(type, loading)}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={styles}
    />
  )
}
