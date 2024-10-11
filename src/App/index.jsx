import { useState } from 'react';
import './index.css';

export function App() {
  const [jsonResult, setJsonResult] = useState(false);
  const [xmlResult, setXmlResult] = useState(false);
  const JSON_2_XML_URL = 'http://127.0.0.1:5000/convert/json-to-xml';
  const XML_2_JSON_URL = 'http://127.0.0.1:5000/convert/xml-to-json';

  async function onSubmitJSON(e) {
    e.preventDefault();
    const jsonBody = document.getElementById('json-input').value;

    await fetch(JSON_2_XML_URL, {
      method: 'POST',
      body: jsonBody,
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
        setJsonResult(xmlText); // Asignar el contenido del XML
      })
      .catch((error) => {
        console.error(
          `There was a problem with
                   the fetch operation:`,
          error
        );
      });
  }

  async function onSubmitXML(e) {
    e.preventDefault();
    await fetch(XML_2_JSON_URL, {
      method: 'POST',
      body: document.getElementById('xml-input').value,
      headers: {
        'Content-Type': 'application/xml',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((jsonRes) => {
        setXmlResult(jsonRes);
      })
      .catch((error) => {
        console.error(
          `There was a problem with
                   the fetch operation:`,
          error
        );
      });
  }
  return (
    <div className='app-container'>
      <div className='data-container'>
        <form className='data-form' id='json-form' onSubmit={onSubmitJSON}>
          <label id='json-label' htmlFor='json-input'>
            JSON
          </label>
          <textarea className='data-input' id='json-input'></textarea>
          <button type='submit'>Submit</button>
        </form>
        <pre className='result-display'>{jsonResult}</pre>
      </div>
      <div className='data-container'>
        <form className='data-form' id='xml-form' onSubmit={onSubmitXML}>
          <label id='xml-label' htmlFor='xml-input'>
            XML
          </label>
          <textarea className='data-input' id='xml-input'></textarea>
          <button type='submit'>Submit</button>
        </form>
        <pre className='result-display'>{xmlResult}</pre>
      </div>
    </div>
  );
}
