import React,  { useEffect, useState }from 'react';
import { createWorker } from 'tesseract.js';
import img from '../../assets/test.2.png'

interface PropsType {
  content: string;
}

const ImageToText: React.FC<PropsType> = () => {
  
  const [ocr, setOcr] = useState('识别中...');
  
  const worker = createWorker({
    workerPath: './worker.min.js',
    langPath: './tessdata',
    corePath: './tesseract-core.wasm.js',
    logger: m => console.log(m),
  });
  
  
  const doOCR = async () => {
    await worker.load();
    await worker.loadLanguage('chi_sim+eng');
    await worker.initialize('chi_sim+eng');
    const { data: { text } } = await worker.recognize(img);
    setOcr(text);
  };
  
  useEffect(() => {
    doOCR();
  });
  
 
  
  
  return (
    <>
      <p>{ocr}</p>
    </>
  )
  
}

export default ImageToText;
