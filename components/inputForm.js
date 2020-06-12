import { useDispatch } from 'react-redux'
import { addActivity} from '../state/actions'
import { Card, Col, Input, Row } from 'antd';
const { Search } = Input;


const InputForm = () => {
  const dispatch = useDispatch()

  const form = { } 

  const handleSubmit = () =>  {
    console.log(form);
    dispatch(addActivity(form.activity))
  }

  const handleChange = (e) =>  {
    form[e.target.name] = e.target.value
  }

  return (
    <>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Add activity">
              <Search
                placeholder="poop"
                onChange={ handleChange }
                onSearch={ handleSubmit }
                style={{ width: 200 }}
                name="activity"
                enterButton="Submit"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default InputForm
