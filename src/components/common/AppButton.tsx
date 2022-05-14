import React, { ReactNode } from 'react'
import classes from "../../assets/styles/btn.module.css";

interface IProps {
  children: ReactNode | ReactNode[],
  onClick?: () => any,
  className?: string
}

const AppButton = (props: IProps) => {
  return (
    <div {...props} className={classes.btn} >
      { props.children }
    </div>
  )
}

export default React.memo(AppButton);
