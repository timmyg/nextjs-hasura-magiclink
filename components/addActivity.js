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
    <div>
      <form onSubmit={ onActivitySubmit }
          style={{display: 'flex', justifyContent: 'center'}}
        >
        <TextInput
          name="activity"
          id="activity"
          placeholder='poop at 540pm'
          disabled={loading} 
          defaultValue={ form.val }
          onChange={ handleChange }
        />
        <Button type="submit" value="Add" appearance="primary"  disabled={loading} marginLeft={majorScale(1)}>
          Add
        </Button>
      </form>
      <div style={{width: 'fit-content', margin: '0 auto'}}>
        <Heading is="h3" marginTop={majorScale(2)} textAlign={"center"}>Examples</Heading>
        <ul>
          <li><Text>poop</Text></li>
          <li><Text>poop at 923am</Text></li>
          <li><Text>feed</Text></li>
          <li><Text>feed at 110pm</Text></li>
        </ul>
      </div>
    </div>
  )
}

export default AddForm
