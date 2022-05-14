import { ReactNode } from 'react'
import classes from "../assets/styles/default.module.css";

interface IProps {
  children: ReactNode | ReactNode[]
}

const DefaultLayout = (props: IProps) => {
  return (
    <>
      <div className={classes.header}></div>
      <div className={classes.content}>
        { props.children }
      </div>
    </>
    
  )
}

export default DefaultLayout;