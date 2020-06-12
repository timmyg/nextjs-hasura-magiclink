import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { startClock } from '../state/actions'
import Examples from '../components/examples'
import InputForm from '../components/inputForm'
// import Button from 'react-bootstrap/Button';
// import Input from 'react-bootstrap/Input';


const Index = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(startClock())
  }, [dispatch])

  // saveKonfigElementHandler(e) {
  //     const { value } = e.target.previousElementSibling;
  //     // Use `value` ...
  // }

  return (
    <>
      <Examples />
      <InputForm />
    </>
  )
}

export default Index
