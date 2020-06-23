import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { deleteActivity, getActivities, setActivitiesFilter } from '../state/actions'
import { Table, IconButton, Text } from 'evergreen-ui'
import Moment from 'react-moment';
import 'moment-timezone';

const ViewActivities = () => {
  const dispatch = useDispatch()
  const activities = useSelector(({activityForm}) => {
    return activityForm.activities
  })
  useEffect(() => {
    dispatch(getActivities())
  }, [dispatch])

  const handleSearch = (searchText) => {
    dispatch(setActivitiesFilter(searchText))
  }

  const handleDelete = (activity) => {
    dispatch(deleteActivity(activity))
  }

  if (!activities.length) {
    return (
      <div style={{textAlign: 'center'}}>
        <Text>No activities added</Text>
      </div>
    )
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Table minWidth={600} maxWidth={800}>
        <Table.Head backgroundColor="white">
          <Table.SearchHeaderCell 
            onChange={ handleSearch }
            placeholder='Search activity...'
          />
          <Table.TextHeaderCell>
            Activity Time
          </Table.TextHeaderCell>
          <Table.TextHeaderCell></Table.TextHeaderCell>
        </Table.Head>
        <Table>
          {activities.map(activity => (
            <Table.Row key={activity.id}>
              <Table.TextCell>{activity.type}</Table.TextCell>
              <Table.TextCell>
                <Moment format="M/D h:mma" utc local>
                  {activity.start_at}
                </Moment>
              </Table.TextCell>
              <Table.TextCell>
                <IconButton appearance="minimal" icon="trash" intent="danger" onClick={() => { handleDelete(activity) } }/>
              </Table.TextCell>
            </Table.Row>
          ))}
        </Table>
      </Table>
    </div>
  )
}

export default ViewActivities
