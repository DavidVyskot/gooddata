import React, { useState } from 'react';

import DatePicker from 'react-datepicker';
 
import "react-datepicker/dist/react-datepicker.css";
import '@gooddata/react-components/styles/css/main.css';

import { ColumnChart } from '@gooddata/react-components';
import { format, addMonths, addDays } from 'date-fns';

import './App.css';

import styled from 'styled-components';

const DatePickerStyled = styled(DatePicker)`
  font-size: 2rem
`;

const grossProfitMeasure = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/6877';
const dateAttributeInMonths = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2142';
const dateAttribute = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2180';

const initFilterDate = new Date('2016-01-01');

function App() {
  // use hook for work with state
  const [date, setDate] = useState(initFilterDate);

  const getMonthFilter = () => {
    // selected date from datepicker
    const startDate = format(date, 'yyyy-MM-dd');
    // add on month and minus one day equals last day in month
    const endDate = format(addDays(addMonths(date, 1), -1), 'yyyy-MM-dd');
    return {
        absoluteDateFilter: {
            dataSet: {
                uri: dateAttribute
            },
            from: startDate,
            to: endDate
        }

    }
  }

  const getMeasures = () => {
      return [
          {
              measure: {
                  localIdentifier: 'm1',
                  definition: {
                      measureDefinition: {
                          item: {
                              uri: grossProfitMeasure
                          }
                      }
                  },
                  alias: '$ Gross Profit'
              }
          }
      ]
  }

  const getViewBy = () => {
      return {
          visualizationAttribute:
          {
              displayForm: {
                  uri: dateAttributeInMonths
              },
              localIdentifier: 'a1'
          }
      }
  }

  // function render Datepicker for select year and month. If i want I can use two Datepisker for range
  // For complicated filter is better create new component and use Formik
  // Next way is use Date Filter Component from our components, here I can't find settings for select month and years only
  const grossProfitFilter = () => {
    return (
        <DatePickerStyled
            dateFormat="MM/yyyy"
            showMonthYearPicker
            selected={date}
            onChange={date => setDate(date as Date)}
        />
    );
};

  const projectId = 'xms7ga4tf3g3nzucd8380o2bev8oeknp';
  const filters = [getMonthFilter()];
  const measures = getMeasures();
  const viewBy = getViewBy();

  return (
    <div className="App">
      <h1>$ Gross Profit in month {grossProfitFilter()}</h1>
      <div>
          <ColumnChart
              measures={measures}
              filters={filters}
              projectId={projectId}
          />
      </div>
      <h1>$ Gross Profit - All months</h1>
      <div>
          <ColumnChart
              measures={measures}
              viewBy={viewBy}
              projectId={projectId}
          />
      </div>
    </div>
  );
}

export default App;
