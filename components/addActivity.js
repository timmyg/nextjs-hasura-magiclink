import { Button, TextInput, Text, Heading, majorScale } from 'evergreen-ui'
import { useState } from 'react'

const AddForm = ({onActivitySubmit, loading}) => {
  const [form, setForm] = useState({
    val: ""
  })

  const handleChange = (e) => {
    setForm({
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <form onSubmit={ onActivitySubmit }
          margin={16}
          textalign="center"
          background="white"
          >
        <TextInput
          name="activity"
          id="activity"
          placeholder='poop at 540pm'
          disabled={loading} 
          defaultValue={ form.val }
          onChange={ handleChange }
        />
        <Button type="submit" value="Add" appearance="primary"  disabled={loading} marginLeft={8}>
          Add
        </Button>
        <Heading is="h3" marginTop={majorScale(2)}>Examples:</Heading>
        <ul>
          <li><Text>poop</Text></li>
          <li><Text>poop at 923am</Text></li>
          <li><Text>feed</Text></li>
          <li><Text>feed at 110pm</Text></li>
        </ul>
      </form>
    </div>
  )
}

export default AddForm
