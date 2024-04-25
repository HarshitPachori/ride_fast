import { Grid } from "@mui/material";
import Image from "next/image";
import React from "react";

interface Props {
  children: React.ReactNode;
}
function Layout({ children }: Props) {
  return (
    <div className="h-screen">
      <Grid container>
        <Grid item xs={12} md={8} lg={5}>
          {children}
        </Grid>
        <Grid
          item
          md={4}
          lg={7}
          sx={{
            display: { xs: "none", md: "block" },
          }}
          className="h-screen w-full "
        >
          <Image
            src="https://olawebcdn.com/images/v1/bg_city.jpg"
            alt=""
            className="w-full h-full object-cover object-right-top"
            sizes="100"
            height={0}
            width={0}
            priority
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Layout;
