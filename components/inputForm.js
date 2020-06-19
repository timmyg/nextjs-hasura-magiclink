import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addActivity, getActivities } from '../state/actions'
import { Button, TextInput } from 'evergreen-ui'

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
    <>
      <form onSubmit={ handleSubmit }
          margin={16}
          textalign="center"
          background="white"
          >
        <TextInput
          name="activity"
          id="activity"
          placeholder="Add Activity"
          disabled={loading} 
          hint="This is a hint."
        />
        <Button type="submit" value="Add" appearance="primary"  disabled={loading} marginLeft={8}>
          Add
        </Button>
      </form>
    </>
  )
}

export default InputForm
