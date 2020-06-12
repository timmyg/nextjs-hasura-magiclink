import { useSelector, useDispatch } from 'react-redux'
import { addActivity, setText} from '../state/actions'

const InputForm = () => {
  const count = useSelector((state) => state.counter)
  const dispatch = useDispatch()

  const handleClick = (e) =>  {
    dispatch(addActivity("test3"))
    
  }
  const handleChange = (e) =>  {
    dispatch(setText(e.currentTarget.value))
  }

  return (
    <>
      <input type="text" onChange={ handleChange } />
      <input
        type="button"
        value="Submit"
        onClick={handleClick}
      />
    </>
  )
}

export default InputForm
