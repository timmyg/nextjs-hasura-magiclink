import { Table, IconButton, Text, majorScale, Pane, Spinner } from 'evergreen-ui'
import Moment from 'react-moment';
import 'moment-timezone';

const ViewActivities = ({onHandleSearch, onHandleDelete, activities, loading}) => {
  const hasActivities = !!activities.length

  if (loading) {
    return (
      <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
        <Spinner />
      </Pane>
    )
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Table minWidth={600} maxWidth={800}>
        <Table.Head backgroundColor="white">
          <Table.SearchHeaderCell 
            onChange={ onHandleSearch }
            placeholder='Search activity...'
          />
          <Table.TextHeaderCell>
            Activity Time
          </Table.TextHeaderCell>
          <Table.TextHeaderCell></Table.TextHeaderCell>
        </Table.Head>
        <Table>
          {hasActivities ? (
            activities.map(activity => (
              <Table.Row key={activity.id}>
                <Table.TextCell>{activity.type}</Table.TextCell>
                <Table.TextCell>
                  <Moment format="M/D h:mma" utc local>
                    {activity.start_at}
                  </Moment>
                </Table.TextCell>
                <Table.TextCell>
                  <IconButton appearance="minimal" icon="trash" intent="danger" onClick={() => { onHandleDelete(activity) } }/>
                </Table.TextCell>
              </Table.Row>
            ))
          ) : (
            <div style={{textAlign: 'center', marginTop: majorScale(1) }}>
              <Text>No activities</Text>
            </div>
          )}
        </Table>
      </Table>
    </div>
  )
}

export default ViewActivities
