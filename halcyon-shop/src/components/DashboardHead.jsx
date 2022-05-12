import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

import { Link,NavLink } from "react-router-dom";

export default function DashboardHead() {


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} xs={3}>
              پنل مدیریت
            </Typography>
            <Grid item container className="boxing" sx={{ flexGrow: 1 }} xs={4}>
              <NavLink to={{pathname:'manage-page'}}>کالاها</NavLink>
              <Link to={{pathname:'manage-of-sp'}}>موجودی‌ و قیمت‌ها</Link>
              <Link to={{pathname:'order-page'}}>سفارش‌ها</Link>
            </Grid>
            <Link to={{pathname:'..//'}} xs={1}>بازگشت به سایت</Link>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}