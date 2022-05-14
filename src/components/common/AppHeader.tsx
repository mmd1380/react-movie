import React from 'react';
import { IProps } from '../../types/base';
import classes from "../../assets/styles/appHeader.module.css"

const AppHeader = (props: IProps) => {
  return (
    <div className={classes['app-header']}>
      { props.children }
    </div>
  )
}

export default React.memo(AppHeader)