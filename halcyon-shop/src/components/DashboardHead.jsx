import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import QrCodeIcon from '@mui/icons-material/QrCode';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';


import { Link,NavLink } from "react-router-dom";

export default function DashboardHead() {


  return (
    
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} xs={4}>
              <AssignmentIndIcon
              fontSize="small"
              color="primary"
              sx={{ marginBottom: "-6px", paddingX: "3px" }}
              />
              پنل مدیریت
            </Typography>
            <Grid item container className="boxing" sx={{ flexGrow: 1 }} xs={6}>
              <NavLink to={{pathname:'manage-page'}} style={({isActive})=>({backgroundColor:isActive?"#5ab7fd":'transparent'})}>
              <QrCodeIcon
              fontSize="small"
              color="primary"
              sx={{ marginBottom: "-5px", paddingX: "3px" }}
              />
                کالاها</NavLink>
              <NavLink to={{pathname:'manage-of-sp'}} style={({isActive})=>({backgroundColor:isActive?"#5ab7fd":'transparent'})}>
              <PriceChangeIcon
              fontSize="small"
              color="primary"
              sx={{ marginBottom: "-5px", paddingX: "3px" }}
              />
                موجودی‌ و قیمت‌ها</NavLink>
              <NavLink to={{pathname:'order-page'}} style={({isActive})=>({backgroundColor:isActive?"#5ab7fd":'transparent'})}>
              <IntegrationInstructionsIcon
              fontSize="small"
              color="primary"
              sx={{ marginBottom: "-5px", paddingX: "3px" }}
              />
                سفارش‌ها</NavLink>
            </Grid>
            <Link to={{pathname:'..//'}} xs={1}><Typography variant="h6">بازگشت به سایت
            <KeyboardReturnIcon
              fontSize="medium"
              color="primary"
              sx={{ marginBottom: "-10px", paddingX: "3px" }}
              />
            </Typography></Link>
          </Toolbar>
        </AppBar>
      </Box>
  
  );
}
