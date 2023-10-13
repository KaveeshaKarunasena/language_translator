import axios from 'axios';
import { useEffect, useState } from 'react';
import qs from 'qs';

const Convert = ({ language, text }: any) => {
  const [results, setResults] = useState('');

  console.log(text);
  useEffect(() => {
    const translate = async () => {
      const translation = await axios.post(
        'https://google-translate1.p.rapidapi.com/language/translate/v2',
        qs.stringify({
          q: text,
          target: language.value,
        }),
        {
          headers: {
            'x-rapidapi-key':
              'cd4662825bmshfb23e36cc668d7fp111f42jsn736f6cc3a9aa',
            'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
          },
        },
      );

      setResults(translation.data.data.translations[0].translatedText);
    };

    translate();
  }, []);
  console.log(results);
  return (
    <div>
      <p>{results}</p>
    </div>
  );
};

export default Convert;
