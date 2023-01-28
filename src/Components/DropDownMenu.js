import { SelectList } from 'react-native-dropdown-select-list';
import { useState, useEffect } from 'react';

export const graphOptions = [
  {value: 'Emissions per method', key: 'pie'},
  {value: 'Total emissions', key: 'bar'},
  {value: 'Total kilometers', key: 'km'},
  {value: 'Emissions compared to baseline', key: 'em'},
  {value: 'Trips per method', key: 'tripsPerMethod'},
  {value: 'Number of trips', key: 'numberOfTrips'},
  {value: 'Average emissions', key: 'averageEmissions'}
];

export default function DropdownMenu({choice}) {
    const [selected, setSelected] = useState('');

    useEffect(() => {
        choice(selected);
    }, [selected]);
  
    return (
      <SelectList
        data={graphOptions}
        setSelected={(val) => setSelected(val)}
        save="key"
        search={false}
        defaultOption={{value: 'Emissions per method', key: 'pie'}}
        dropdownStyles={{position: 'absolute', backgroundColor: 'white', top: 40, width: '100%'}}
      />
    );
}; 