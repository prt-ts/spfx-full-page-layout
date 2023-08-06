/* eslint-disable */
import * as React from 'react'
import { Link, makeStyles, shorthands } from '@fluentui/react-components'; 

export const Footer: React.FunctionComponent<{}> = () => {
  const classes = useFooterStyle();
  const links = React.useMemo(() => {
    return [
    {
      title : "This is Link",
      link : ""
    },
    {
      title : "This is Link",
      link : ""
    },
    {
      title : "This is Link",
      link : ""
    },
    {
      title : "This is Link",
      link : ""
    },
    {
      title : "This is Link",
      link : ""
    },
    {
      title : "This is Link",
      link : ""
    },
  ]}, []);
  return (
    <div className={classes.footerContainer}>
      <div className={classes.footerItem}>First</div>
      <div className={classes.footerItem}>
        {
          links.map(link => (
            <Link href={link.link}>
              {link.title}
            </Link>))
        }
      </div>
      <div className={classes.footerItem}><span>@copyright - All rights reserved by IRMB.</span></div>
    </div>
  )
}

const useFooterStyle = makeStyles({
  footerContainer: {
    display: "flex",
    justifyContent: "space-between", 
    alignItem: "center",
    height: "100%",
    ...shorthands.padding(0, "10px")
  },

  footerItem: {
    display: "flex",
    justifyContent: "center", 
    ...shorthands.gap("10px")
  }
})