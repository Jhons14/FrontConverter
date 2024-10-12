import { useState } from 'react';
import './index.css';
import { DataContainer } from '../components/DataContainer';

export function App() {
  const [formatToConvert, setFormatToConvert] = useState('JSON-XML');
  const [data, setData] = useState('');
  const [dataResult, setDataResult] = useState('');
  const [error, setError] = useState();

  function onChooseFormat(format) {
    setFormatToConvert(format);
    setDataResult('');
    document.getElementById('data-input').value = '';
    setError();
  }

  return (
    <div className='app-container'>
      <div className='format-buttons-container'>
        <button
          type='button'
          className='format-button'
          id={'JSON-XML'}
          onClick={() => onChooseFormat('JSON-XML')}
        >
          JSON TO XML
        </button>
        <button
          type='button'
          className='format-button'
          id={'XML-JSON'}
          onClick={() => onChooseFormat('XML-JSON')}
        >
          XML TO JSON
        </button>
      </div>

      <DataContainer
        formatToConvert={formatToConvert}
        dataResult={dataResult}
        setDataResult={setDataResult}
        data={data}
        setData={setData}
        error={error}
        setError={setError}
      />
    </div>
  );
}
