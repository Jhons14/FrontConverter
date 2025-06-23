import { DataContainer } from '../components/DataContainer/DataContainer';
import { useEffect, useState } from 'react';
import './App.css';

export function App() {
  const [formatToConvert, setFormatToConvert] = useState('JSON-XML');
  const [data, setData] = useState('');
  const [dataResult, setDataResult] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setDataResult('');
    setError(null);
    setData('');
  }, [formatToConvert]);

  function onChooseFormat(format) {
    setFormatToConvert(format);
  }

  function isSelected(format) {
    if (format === formatToConvert) {
      return 'active';
    } else {
      return '';
    }
  }

  return (
    <div className='app-container'>
      <div className='format-buttons-container'>
        <button
          type='button'
          className={`button format-button ${isSelected('JSON-XML')}`}
          id={'JSON-XML'}
          onClick={() => onChooseFormat('JSON-XML')}
        >
          JSON TO XML
        </button>
        <button
          type='button'
          className={`button format-button ${isSelected('XML-JSON')}`}
          id={'XML-JSON'}
          onClick={() => onChooseFormat('XML-JSON')}
        >
          XML TO JSON
        </button>
      </div>
      <div className='formData-container'>
        <h3 htmlFor='data-input'>{formatToConvert}</h3>
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
    </div>
  );
}
