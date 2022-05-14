import React from 'react'
import classes from "../../assets/styles/loading.module.css";

const AppLoading = () => {
  return (
    <div className={classes['loading-ring']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default React.memo(AppLoading)