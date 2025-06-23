import './DataContainer.css';
export function DataContainer({
  dataResult,
  setDataResult,
  formatToConvert,
  data,
  setData,
  setError,
}) {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const JSON_2_XML_URL = `${SERVER_URL}/convert/json-to-xml`;
  const XML_2_JSON_URL = `${SERVER_URL}/convert/xml-to-json`;
  const formatErrorMsg = 'Error. Por favor revisa el formato de entrada';

  function onSubmitData(e, data) {
    setDataResult('');
    setError('');
    e.preventDefault();
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
      setError(formatErrorMsg);
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
      setError(formatErrorMsg);
    } else if (!response || response.status === 500) {
      setError('Error en el servidor');
    }
  }

  return (
    <form className='data-form' onSubmit={(e) => onSubmitData(e, data)}>
      <div className='data-container'>
        <textarea
          value={data}
          className='data-input'
          placeholder={`Put some ${formatToConvert} text`}
          onChange={(e) => setData(e.target?.value)}
        ></textarea>
        <textarea className='data-output' value={dataResult}></textarea>
      </div>
      <button className='button submit-button' type='submit'>
        Submit
      </button>
    </form>
  );
}
