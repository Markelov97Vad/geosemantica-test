import Input from '../Input/Input';
import './Navigation.scss';
import * as dataJsonRes from '../../utils/api-response.json';
import * as dataJsonResRandom from '../../utils/api-response-random.json';
import { ChangeEvent, useEffect, useState } from 'react';
import { ApiGeocoderResponseType, IGeoObject } from '@/types/api';
import useDebouncedSearch from '@/hooks/useDebounceSearch';
// import useDebouncedSearch from '@/hooks/useDebounceSearch';

function Navigation() {
  // console.log(dataToFetch);
  const dataJson = dataJsonRes as unknown as ApiGeocoderResponseType;
  const dataJson2 = dataJsonResRandom as unknown as ApiGeocoderResponseType;
  const [data, setData] = useState<IGeoObject[]>(
    dataJson2.response.GeoObjectCollection.featureMember,
  );
  const [inputValue, setInputValue] = useState('');
  const debounceSearch = useDebouncedSearch(inputValue, 1000);
  // const [data, setData] = useState<any[]>(dataJson2.response.GeoObjectCollection.featureMember);

  useEffect(() => {
    if (debounceSearch.length > 2) {
      console.log(debounceSearch);
    }
  }, [debounceSearch]);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setInputValue(value);
  }

  return (
    <form className="navigation">
      <Input 
        name='search'
        value={inputValue}
        handleChange={handleChange}
        placeholder='Введите данные сюда..'
      />
      {
        data.length > 0 &&
        <div className="dropdown">
          <ul className="dropdown__list">
            {data.map((dataPlace, i) => {
              return (
                <li key={i} className="dropdown__link">
                  {dataPlace.GeoObject.name}
                  <span className='dropdown__description'>{dataPlace.GeoObject.description}</span>
                </li>
              );
            })}
          </ul>
        </div>
      }
    </form>
  );
}

export default Navigation;
