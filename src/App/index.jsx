import './index.css';

export function App() {
  return (
    <div className='app-container'>
      <form className='data-form' id='json-form'>
        <label id='json-label' for='json-input'>
          JSON
        </label>
        <textarea className='data-input' id='json-input'></textarea>
        <button type='submit'>Submit</button>
      </form>
      <form className='data-form' id='xml-form'>
        <label id='xml-label' for='xml-input'>
          XML
        </label>
        <textarea className='data-input' id='xml-input'></textarea>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
