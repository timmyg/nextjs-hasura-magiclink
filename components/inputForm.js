import { useSelector, useDispatch } from 'react-redux'
import { addActivity } from '../state/actions'

const InputForm = () => {
  const count = useSelector((state) => state.counter)
  const dispatch = useDispatch()

  const handleClick = (e) =>  {
    dispatch(addActivity("test3"))
  }
  const handleChange = (e) =>  {
    console.log(e.currentTarget.value);
  }

  return (
    <>
      <input type="text" onChange={ handleChange } />
      <input
        type="button"
        value="Alert the text input"
        onClick={handleClick}
      />
    </>
  )
}

export default InputForm
