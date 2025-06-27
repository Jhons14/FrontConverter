import { useEffect, useMemo, useRef, useState } from 'react';
import { InputWindow } from '../InputWindow/InputWindow';
import './DataContainer.css';
import { OutputWindow } from '../OutputWindow/OutputWindow';

export function DataContainer({ formatToConvert }) {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const JSON_2_XML_URL = `${SERVER_URL}/convert/json-to-xml`;
  const XML_2_JSON_URL = `${SERVER_URL}/convert/xml-to-json`;
  const formatErrorMsg = 'Error. Por favor revisa el formato de entrada';
  const formRef = useRef(null);

  const [data, setData] = useState('');
  const [dataResult, setDataResult] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setDataResult('');
    setError(null);
    setData('');
  }, [formatToConvert]);

  function onSubmitData(e, data) {
    e.preventDefault();
    if (!data || data.trim() === '') {
      return;
    }
    setDataResult('');
    setError('');

    if (formatToConvert === 'JSON-XML') {
      onSubmitJSON(data);
    } else {
      onSubmitXML(data);
    }
  }

  async function onSubmitJSON(jsonData) {
    const response = await fetch(JSON_2_XML_URL, {
      method: 'POST',
      body: jsonData,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      setDataResult(await response.text());
    } else if (response.status === 400) {
      alert(formatErrorMsg);
    } else if (!response || response.status === 500) {
      setError('Error en el servidor');
    }
  }

  async function onSubmitXML(xmlData) {
    const response = await fetch(XML_2_JSON_URL, {
      method: 'POST',
      body: xmlData,
      headers: {
        'Content-Type': 'application/xml',
      },
    });

    if (response.ok) {
      setDataResult(await response.json());
    } else if (response.status === 400) {
      alert(formatErrorMsg);
    } else if (!response || response.status === 500) {
      setError('Error en el servidor');
    }
  }

  return (
    <form
      className='data-form'
      ref={formRef}
      onSubmit={(e) => onSubmitData(e, data)}
    >
      {formatToConvert === 'JSON-XML' ? (
        <div className='data-container'>
          <InputWindow format={'json'} setData={setData} />
          <OutputWindow dataResult={dataResult} format={'xml'} />
        </div>
      ) : (
        <div className='data-container'>
          <InputWindow format={'xml'} setData={setData} />
          <OutputWindow dataResult={dataResult} format={'json'} />
        </div>
      )}
      <button className='button submit-button' type='submit'>
        Transform
      </button>
    </form>
  );
}
