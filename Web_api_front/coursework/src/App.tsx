import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'antd/dist/reset.css';
import { Card, Button, DatePicker } from 'antd';

let counter = 0
const onChange: DatePickerProps['onChange'] = (date, dateString) => {
 console.log(date, dateString);
};
const onClick = (event: any) => {
 console.log(counter++)
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div >
 <Card title="Default card" style={{ width: 300 }}>
 <p>Card content</p>
 <p>Card content</p>
 <p>Card content 123</p>
 </Card>

 <br/>

 <Button type="primary" onClick={onClick}>Button</Button>
 <Button type="primary" danger>Button</Button>
 <br/>
<DatePicker onChange={onChange} />
 </div>  
    </>
  )
}

export default App
