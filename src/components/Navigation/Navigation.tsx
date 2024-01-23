import './Navigation.scss';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useDebouncedSearch from '@/hooks/useDebounceSearch';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { addPoint, clearSearchData } from '@/store/searchSlice';
import { fetchOrganization, fetchPlace } from '@/store/api';
import Dropdown from '../Dropdown/Dropdown';

function Navigation() {
  const [inputValue, setInputValue] = useState('');
  const { placeData, organizationData } = useAppSelector(state => state.search);
  const debounceSearch = useDebouncedSearch(inputValue, 1000);
  const inputRef = useRef();
  const dispatch = useAppDispatch();
  const dataSearch = [organizationData, placeData];

  useEffect(() => {
    if (debounceSearch.length > 2 && document.activeElement === inputRef.current) {
      dispatch(fetchPlace(debounceSearch.trim().toLocaleLowerCase()));
      dispatch(fetchOrganization(debounceSearch.trim().toLocaleLowerCase()));
    }
  }, [debounceSearch]);
  
  useEffect(() => {
    if (inputValue.length === 0) {
      dispatch(clearSearchData());
    }
  }, [inputValue]);

  const selectPoint = (text: string, point: string) => {
    setInputValue(text);
    dispatch(addPoint(point));
  };

  const handleClear = () => {
    setInputValue('');
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setInputValue(value);
  };

  const isFocus = (): boolean => {
    return document.activeElement === inputRef.current;
  };

  return (
    <form className="navigation" onSubmit={e => e.preventDefault()}>
      <div className="navigation__input-wrapper">
        <input
          ref={inputRef}
          value={inputValue}
          name="search"
          onChange={handleChange}
          className="navigation__input"
          type="text"
          minLength={3}
          maxLength={100}
          autoComplete="off"
          placeholder="Введите запрос сюда.."
        />
        <button onClick={handleClear} className="navigation__button" type="button"></button>
      </div>
      {(placeData.length > 0 || organizationData.length > 0) && isFocus() && inputValue.length > 2 && (
        <Dropdown dataSearch={dataSearch} selectPoint={selectPoint} />
      )}
    </form>
  );
}

export default Navigation;
