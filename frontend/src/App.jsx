import { useEffect, useState } from 'react'
import personService from './services/persons'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return <p className={`message ${type}`}>{message}</p>
}

const Filter = ({ searchableText, onSearch }) => (
  <div>
    filter shown with
    <input value={searchableText} onChange={onSearch} />
  </div>
)

const PersonForm = ({ onSubmit, newName, onNameChange, newNumber, onNumberChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={onNumberChange} />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
)

const Persons = ({ searchResults, onDelete }) => (
  <>
    {searchResults.map(person => (
      <div key={person.id}>
        {person.name} {person.number} <button onClick={() => onDelete(person.id, person.name)}>delete</button>
      </div>
    ))}
  </>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchableText, setSearchableText] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  }, [])

  const handleSearch = event => {
    const { value } = event.target
    setSearchableText(value)
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    const { value } = event.target
    setNewNumber(value)
  }

  const handleSubmit = event => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      updatePerson(existingPerson)
      showMessage({ message: `Number changed for ${newName}`, type: 'success' })
      return
    }

    const newPerson = { name: newName, number: newNumber, id: (persons.length + 1).toString() }
    personService.create(newPerson).then(person => {
      setPersons([...persons, person])
      showMessage({ message: `Added ${newName}`, type: 'success' })
      cleanFields()
    })
  }

  const updatePerson = currentPerson => {
    const shouldUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
    if (!shouldUpdate) {
      return
    }

    const personWithNewData = { ...currentPerson, number: newNumber }
    personService
      .update(personWithNewData)
      .then(updatedPerson => {
        const updatedPersons = persons.map(person => {
          return person.id === updatedPerson.id ? { ...person, ...updatedPerson } : person
        })
        setPersons(updatedPersons)
        cleanFields()
      })
      .catch(() => {
        showMessage({ message: `Information of ${newName} has already been removed from server`, type: 'error' })
      })
  }

  const showMessage = ({ message, type }) => {
    setMessage(message)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const checkTextInsideBigText = (bigText, text) => {
    const regex = new RegExp(text, 'i')
    return regex.test(bigText)
  }

  const searchResults = persons.filter(person => checkTextInsideBigText(person.name, searchableText))

  const handleDelete = (personId, personName) => {
    if (window.confirm(`Delete ${personName}`)) {
      personService.deleteById(personId)
      const remainingPersons = persons.filter(person => person.id !== personId)
      setPersons(remainingPersons)
    }
  }

  const cleanFields = () => {
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType}/>
      <Filter searchableText={searchableText} onSearch={handleSearch} />
      <h3>add a new</h3>
      <PersonForm onSubmit={handleSubmit} newName={newName} onNameChange={handleNameChange} newNumber={newNumber} onNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons searchResults={searchResults} onDelete={handleDelete} />
    </div>
  )
}

export default App
