import CodeMirror from '@uiw/react-codemirror';
import { xml } from '@codemirror/lang-xml';
import { json } from '@codemirror/lang-json';

import { TextQuote } from 'lucide-react';
import { useEffect, useState } from 'react';
import vkbeautify from 'vkbeautify';

export const OutputWindow = ({ format, dataResult, error }) => {
  const [content, setContent] = useState('');

  const extensions = format === 'xml' ? [xml()] : [json()];

  useEffect(() => {
    setContent(dataResult);
  }, [dataResult]);

  const handleFormat = () => {
    if (!content || content.trim() === '') {
      return;
    }
    try {
      const parser = new DOMParser();
      const xml = parser.parseFromString(content, 'application/xml');

      if (xml.getElementsByTagName('parsererror').length > 0) {
        throw new Error('XML inválido');
      }
      const s = new XMLSerializer();

      const rawXml = s.serializeToString(xml);
      const prettyXml = vkbeautify.xml(rawXml);

      setContent(prettyXml);
    } catch (e) {
      alert('XML inválido');
      console.error(e);
    }
  };

  return (
    <div className='h-full relative w-full overflow-y-auto'>
      <CodeMirror
        value={content}
        align='start'
        theme={'dark'}
        height='100%'
        extensions={extensions}
        className='bg-gray-500 rounded-md p-1 text-sm h-full'
        onChange={(value) => setContent(value)}
      />
      <button
        onClick={handleFormat}
        type='button'
        className='bg-blue-600 text-white p-2 rounded hover:bg-blue-700 absolute top-2 right-2 cursor-pointer'
      >
        <TextQuote />
      </button>
    </div>
  );
};
