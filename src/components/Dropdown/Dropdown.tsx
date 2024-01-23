import { useAppDispatch } from '@/hooks/reduxHooks';
import { addPoint } from '@/store/searchSlice';
import { OrganizationDataType } from '@/types/apiOrganization';
import { featureMemberType } from '@/types/apiPlace';
import './Dropdown.scss';

type DropdownProps = {
  dataSearch: (OrganizationDataType[] | featureMemberType[])[];
  selectPoint: (value: string, point: string) => void;
};

function Dropdown({ dataSearch, selectPoint }: DropdownProps) {
  const organizationData = dataSearch[0] as OrganizationDataType[];
  const placeData = dataSearch[1] as featureMemberType[];

  return (
    <div className="dropdown">
      <ul className="dropdown__list">
        {organizationData.map((data, i) => {
          const point = `${data.geometry.coordinates[0]} ${data.geometry.coordinates[1]}`;
          const title = data.properties.name;
          const description = data.properties.description;
          const finalRequest = `${description}, ${title}`;

          const handleClick = (): void => {
            selectPoint(finalRequest, point);
          };
          return (
            <li onClick={handleClick} key={i} className="dropdown__link">
              {title}
              <span className="dropdown__description">{description}</span>
            </li>
          );
        })}
        {placeData.map((data, i) => {
          const point = data.GeoObject.Point.pos;
          const finalRequest = data.GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted;
          const title = data.GeoObject.name;
          const description = data.GeoObject.description;

          const handleClick = (): void => {
            selectPoint(finalRequest, point);
          };
          return (
            <li onClick={handleClick} key={i} className="dropdown__link">
              {title}
              <span className="dropdown__description">{description}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Dropdown;
