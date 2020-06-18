import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addActivity, getActivities, setActivitiesFilter } from '../state/actions'
import { Button, TextInput, Table } from 'evergreen-ui'
import Moment from 'react-moment';
import 'moment-timezone';

const InputForm = () => {
  const dispatch = useDispatch()
  const activities = useSelector(({activityForm}) => {
    return activityForm.activities
  })
  const loading = useSelector(({activityForm}) => {
    return activityForm.loading
  })
  useEffect(() => {
    dispatch(getActivities())
  }, [dispatch])

  const handleSubmit = (event) =>  {
    event.preventDefault();
    const activity = document.getElementById('activity').value;
    const babyId = 1;
    dispatch(addActivity(activity, babyId))
    document.getElementById('activity').value = ''
  }

  const handleSearch = (searchText) => {
    dispatch(setActivitiesFilter(searchText))
  }

  return (
    <>
      <form onSubmit={ handleSubmit } margin={16}>
        <TextInput
          name="activity"
          id="activity"
          placeholder="Add Activity"
          disabled={loading} 
        />
        <Button type="submit" value="Add" appearance="primary"  disabled={loading} marginLeft={8}>
          Add
        </Button>
      </form>
      <br/>
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell 
            onChange={ handleSearch }
            placeholder='Search activity...'
          />
          <Table.TextHeaderCell>
            Last Activity
          </Table.TextHeaderCell>
        </Table.Head>
        <Table.VirtualBody height={240}>
          {activities.map(activity => (
            <Table.Row key={activity.id} isSelectable onSelect={() => alert(activity.type)}>
              <Table.TextCell>{activity.type}</Table.TextCell>
              <Table.TextCell>
                <Moment format="M/D h:mma" utc local>
                  {activity.start_at}
                </Moment>
              </Table.TextCell>
            </Table.Row>
          ))}
        </Table.VirtualBody>
      </Table>


    </>
  )
}

export default InputForm
