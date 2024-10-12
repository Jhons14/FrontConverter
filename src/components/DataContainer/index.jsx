import { useState } from 'react';

export function DataContainer({
  dataResult,
  setDataResult,
  formatToConvert,
  data,
  setData,
  error,
  setError,
}) {
  const JSON_2_XML_URL = 'http://127.0.0.1:5000/convert/json-to-xml';
  const XML_2_JSON_URL = 'http://127.0.0.1:5000/convert/xml-to-json';

  function onSubmitData(e, data) {
    e.preventDefault();
    if (formatToConvert === 'JSON-XML') {
      onSubmitJSON(data);
    } else {
      onSubmitXML(data);
    }
  }

  async function onSubmitJSON(jsonData) {
    await fetch(JSON_2_XML_URL, {
      method: 'POST',
      body: jsonData,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((xmlText) => {
        // Now you can work with the parsed XML document
        setDataResult(xmlText); // Asignar el contenido del XML
      })
      .catch((error) => {
        setError(error);
      });
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
      setDataResult(response.json());
    } else if (response.status === 400) {
      setError('Peticion mal formada revisa el formato de entrada');
    }
  }

  return (
    <div className='data-container'>
      <form
        className='data-form'
        id='data-form'
        onSubmit={(e) => onSubmitData(e, data)}
      >
        <label id='data-label' htmlFor='data-input'>
          {formatToConvert}
        </label>
        <textarea
          className='data-input'
          id='data-input'
          onChange={(e) => setData(e.target?.value)}
        ></textarea>
        <button type='submit'>Submit</button>
      </form>
      <div>{!!error && <div>{error}</div>}</div>
      <pre className='result-display'>{dataResult}</pre>
    </div>
  );
}
