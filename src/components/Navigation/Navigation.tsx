import Input from '../Input/Input';
import './Navigation.scss';
import * as dataJsonRes from '../../utils/api-response.json';
import * as dataJsonResRandom from '../../utils/api-response-random.json';
import { ChangeEvent, MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
import { ApiGeocoderResponseType, IGeoObject } from '@/types/api';
import useDebouncedSearch from '@/hooks/useDebounceSearch';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { addPoint } from '@/store/placeSlice';
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (debounceSearch.length > 2) {
      console.log(debounceSearch);
    }
  }, [debounceSearch]);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setInputValue(value);
  };

  // const handleClick = (evt: MouseEvent<HTMLLIElement>) => {
  //   evt.stopPropagation();
  //   const { textContent } = evt.currentTarget

  
  //   setInputValue(textContent);
  // }

  return (
    <form className="navigation">
      <Input
        name="search"
        value={inputValue}
        handleChange={handleChange}
        placeholder="Введите запрос сюда.."
      />
      {data.length > 0 && (
        <div className="dropdown">
          <ul className="dropdown__list">
            {data.map((dataPlace, i) => {
              const click = (value: string): void => {
                console.log(value);
                dispatch(addPoint(dataPlace.GeoObject.Point.pos))
                setInputValue(value);
              }
              const handlelClick = (): void => {
                click(dataPlace.GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted)
              }
              return (
                <li
                  onClick={handlelClick}
                  key={i}
                  className="dropdown__link"
                >
                  {dataPlace.GeoObject.name}
                  <span className="dropdown__description">
                    {dataPlace.GeoObject.description}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </form>
  );
}

export default Navigation;
