import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import InputForm from '../components/inputForm'


const Index = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    // dispatch(startClock())
  }, [dispatch])

  return (
    <>
      <InputForm />
    </>
  )
}

export default Index
