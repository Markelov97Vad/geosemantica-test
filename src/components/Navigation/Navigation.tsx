import './Navigation.scss';
import * as dataJsonRes from '../../utils/api-response.json';
import * as dataJsonResRandom from '../../utils/api-response-random.json';
import { ChangeEvent, MouseEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { ApiGeocoderResponseType, featureMemberType } from '@/types/apiPlace';
import useDebouncedSearch from '@/hooks/useDebounceSearch';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { addPoint } from '@/store/searchSlice';
import { fetchOrganization, fetchPlace } from '@/store/api';
// import useDebouncedSearch from '@/hooks/useDebounceSearch';

function Navigation() {
  // console.log(dataToFetch);
  const dataJson = dataJsonRes as unknown as ApiGeocoderResponseType;
  const dataJson2 = dataJsonResRandom as unknown as ApiGeocoderResponseType;
  const [data, setData] = useState<featureMemberType[]>(dataJson2.response.GeoObjectCollection.featureMember);
  const [inputValue, setInputValue] = useState('');
  const [searcResult, setSearchResult] = useState('');
  const { placeData, organizationData } = useAppSelector(state => state.search);
  const debounceSearch = useDebouncedSearch(inputValue, 1000);
  const inputRef = useRef();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // inputRef.current.
    if (debounceSearch.length > 2 && document.activeElement === inputRef.current) {
      dispatch(fetchPlace(debounceSearch.trim().toLocaleLowerCase()));
      dispatch(fetchOrganization(debounceSearch.trim().toLocaleLowerCase()));
      console.log(debounceSearch);
    }
  }, [debounceSearch]);

  useEffect(() => {
    // if (document.activeElement === inputRef.current) {
    //   console.log('focus');
    // }
    console.log('Организации', organizationData);
  }, [debounceSearch]);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setInputValue(value);
  };

  const isFocus = (): boolean => {
    return document.activeElement === inputRef.current;
  };

  // const handleClick = (evt: MouseEvent<HTMLLIElement>) => {
  //   evt.stopPropagation();
  //   const { textContent } = evt.currentTarget

  //   setInputValue(textContent);
  // }

  return (
    <form className="navigation" onSubmit={e => e.preventDefault()}>
      <input
        ref={inputRef}
        value={inputValue}
        name="search"
        onChange={handleChange}
        className="navigation__input"
        type="search"
        minLength={3}
        maxLength={50}
        placeholder="Введите запрос сюда.."
      />
      {(placeData.length > 0 || organizationData.length > 0) && isFocus() && inputValue.length > 2 && (
        <div className="dropdown">
          <ul className="dropdown__list">
            {organizationData.map((data, i) => {
              const points = `${data.geometry.coordinates[0]} ${data.geometry.coordinates[1]}`;
              const title = data.properties.name;
              const description = data.properties.description;
              const finalRequest = `${description}, ${title}`;

              const click = (value: string): void => {
                console.log(value);
                dispatch(addPoint(points));
                setInputValue(value);
              };
              const handlelClick = (): void => {
                click(finalRequest);
              };
              return (
                <li onClick={handlelClick} key={i} className="dropdown__link">
                  {title}
                  <span className="dropdown__description">{description}</span>
                </li>
              );
            })}
            {placeData.map((data, i) => {
              const points = data.GeoObject.Point.pos;
              const finalRequest = data.GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted;
              const title = data.GeoObject.name;
              const description = data.GeoObject.description;

              const click = (value: string): void => {
                console.log(value);
                dispatch(addPoint(points));
                setInputValue(value);
              };
              const handlelClick = (): void => {
                click(finalRequest);
              };
              return (
                <li onClick={handlelClick} key={i} className="dropdown__link">
                  {title}
                  <span className="dropdown__description">{description}</span>
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
