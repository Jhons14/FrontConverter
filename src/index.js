const jsonForm = document.getElementById('json-form');
const xmlForm = document.getElementById('xml-form');

const JSON_2_XML_URL = 'http://127.0.0.1:5000/convert/json-to-xml';
const XML_2_JSON_URL = 'http://127.0.0.1:5000/convert/xml-to-json';

jsonForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  await fetch(JSON_2_XML_URL, {
    method: 'POST',
    body: document.getElementById('json-input').value,
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
      const xmlDisplay = document.createElement('pre'); // 'pre' mantiene el formato
      xmlDisplay.textContent = xmlText; // Asignar el contenido del XML
      document.body.appendChild(xmlDisplay); // Agregarlo al cuerpo del documento
    })
    .catch((error) => {
      console.error(
        `There was a problem with
                   the fetch operation:`,
        error
      );
    });
});

xmlForm.addEventListener('submit', async (e) => {
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
      const jsonDisplay = document.createElement('pre'); // 'pre' mantiene el formato
      jsonDisplay.textContent = jsonRes;
      document.body.appendChild(jsonDisplay); // Asignar el contenido del XML // Agregarlo al cuerpo del documento
    })
    .catch((error) => {
      console.error(
        `There was a problem with
                   the fetch operation:`,
        error
      );
    });
});
