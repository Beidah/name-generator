import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [generatedName, setGeneratedName] = useState("");

  const generateName = () => {
    setGeneratedName("Test Name");
  }

  return (
    <div className="App">
      <div className="border border-accent bg-primary-content p-5">
        <h1 className='text-3xl m-6'>Name Generator</h1>
        <button onClick={generateName} className="btn-primary btn-lg btn-wide mb-3">Generate Name</button>
        {generatedName && (
          <div className='bg-secondary border border-secondary-focus text-center p-3'>
            <p className='text-secondary-content'>
              { generatedName }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
