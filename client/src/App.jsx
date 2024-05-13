import  { useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Output from './components/Output';

function App() {
  const [values, setValues] = useState('');
  const [result, setResult] = useState([]);
  const [show,setShow] = useState(false)
  

  const notify = () => toast.success("Success!");
  const notifyError = () => toast.error("You can't submit empty values!");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(values.length===0){
      console.log(`lenght is 0`)
      notifyError()
      return 
    }
    notify()
    setShow(true)
    console.log(`These are your initiial values: `,values.length)
    const valuesArray = values.split(',').map(value => value.trim());
    console.log(`This is the values Array after converting a string into a List`,valuesArray)

    const response = await fetch('https://server20-mohammedjawadsaleem17-mohammed-jawad-saleems-projects.vercel.app/fizzbuzz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: valuesArray }),
    });

    const data = await response.json();
    console.log(`The Received Data is `,data[0])  //We have the received data inthe form of a json utilizing this to Implement the UI
    setResult(data);
  };

  return (
    <div>
      <Header/>
      <Form handleSubmit={handleSubmit} values={values} setValues={setValues}/>
    { show &&  <Output result={result}/>}
      <ToastContainer />
    </div>
  );
}

export default App;
