
import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";

function HeaderEmpresa({ name, children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="6rem"
        borderRadius="xl"
        // sx={{
        //   backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
        //     `${linearGradient(
        //       rgba(gradients.info.main, 0.6),
        //       rgba(gradients.info.state, 0.6)
        //     )}, url(${backgroundImage})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "50%",
        //   overflow: "hidden",
        // }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          {/*<Grid item>*/}
          {/*  <MDAvatar src={burceMars} alt="profile-image" size="xl" shadow="sm" />*/}
          {/*</Grid>*/}
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {name}
              </MDTypography>
              {/*<MDTypography variant="button" color="text" fontWeight="regular">*/}
              {/*  CEO / Co-Founder*/}
              {/*</MDTypography>*/}
            </MDBox>
          </Grid>
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
HeaderEmpresa.defaultProps = {
  children: "",
};

// Typechecking props for the Header
HeaderEmpresa.propTypes = {
  children: PropTypes.node,
};

export default HeaderEmpresa;
