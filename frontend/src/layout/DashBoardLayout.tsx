import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { Grid2 } from "@mui/material";

type Props = {};

const DashBoardLayout = (props: Props) => {
  return (
    <>
      <Grid2>
        <NavBar />
      </Grid2>
      <Grid2>
        <Outlet />
      </Grid2>
    </>
  );
};

export default DashBoardLayout;
