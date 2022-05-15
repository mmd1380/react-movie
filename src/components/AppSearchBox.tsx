import React from 'react';
import classes from "../assets/styles/search.module.css";
import AppButton from './common/AppButton';
import { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

interface IProps {
  searchHandler: (newDate: Array<Date>) => Promise<void>
}

const AppSearchBox = (props: IProps) => {
  const [value, setValue] = useState([new Date(), new Date()]);

  const onChange = (e: any) => {
    setValue(e)
  }

  return (
    <>
      <DateRangePicker onChange={onChange} value={value} />
      <AppButton onClick={() => props.searchHandler(value)} className={classes['search-button']}>
        Search
      </AppButton>
    </>
  )
}

export default React.memo(AppSearchBox);
