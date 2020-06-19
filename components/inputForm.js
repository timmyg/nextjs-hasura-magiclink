import { useDispatch, useSelector } from 'react-redux'
import { addActivity } from '../state/actions'
import { Button, TextInput, Text, Heading, majorScale } from 'evergreen-ui'

const InputForm = () => {
  const dispatch = useDispatch()
  const loading = useSelector(({activityForm}) => {
    return activityForm.loading
  })

  const handleSubmit = (event) =>  {
    event.preventDefault();
    const activity = document.getElementById('activity').value;
    const babyId = 1;
    dispatch(addActivity(activity, babyId))
    document.getElementById('activity').value = ''
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <form onSubmit={ handleSubmit }
          margin={16}
          textalign="center"
          background="white"
          >
        <TextInput
          name="activity"
          id="activity"
          placeholder='poop at 540pm'
          disabled={loading} 
          hint="This is a hint."
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

export default InputForm
