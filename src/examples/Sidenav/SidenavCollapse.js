

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Custom styles for the SidenavCollapse
import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
} from "examples/Sidenav/styles/sidenavCollapse";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import {Collapse, List} from "@mui/material";
import {useState} from "react";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import routes from "../../routes";

function SidenavCollapse({ icon, name, active, children, ...rest }) {
  const [controller] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const  childrenCarregado = {...rest}
    console.log("teste ==> ", childrenCarregado.rotas)
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };
  return (
    <ListItem button onClick={handleToggle} component="li">
      <MDBox
        {...rest}
        sx={(theme) =>
          collapseItem(theme, {
            active,
            transparentSidenav,
            whiteSidenav,
            darkMode,
            sidenavColor,
          })
        }
      >
          {/*{open? <ExpandLess /> : <ExpandMore />}*/}
        <ListItemIcon
          sx={(theme) =>
            collapseIconBox(theme, { transparentSidenav, whiteSidenav, darkMode, active })
          }
        >
          {typeof icon === "string" ? (
            <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
          ) : (
            icon
          )}
        </ListItemIcon>

        <ListItemText
          primary={name}
          sx={(theme) =>
            collapseText(theme, {
              miniSidenav,
              transparentSidenav,
              whiteSidenav,
              active,
            })
          }
        />

          {childrenCarregado.rotas  &&(
          <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding   styles={{lineHeight: 2}}>
                  {childrenCarregado.rotas.map((child, index) => (
                      <ListItemText
                      primary={child.name}
                      onClick={child.route}
                      sx={(theme) =>
                          collapseText(theme, {
                              miniSidenav,
                              transparentSidenav,
                              whiteSidenav,
                              active
                          })
                       }
                      />

                  ))}
                  {/*<ListItemText*/}
                  {/*    primary={name}*/}
                  {/*    sx={(theme) =>*/}
                  {/*        collapseText(theme, {*/}
                  {/*            miniSidenav,*/}
                  {/*            transparentSidenav,*/}
                  {/*            whiteSidenav,*/}
                  {/*            active,*/}
                  {/*        })*/}
                  {/*    }*/}
                  {/*/>*/}
              </List>
          </Collapse>
          )}
      </MDBox>
    </ListItem>
  );
}

// Setting default values for the props of SidenavCollapse
SidenavCollapse.defaultProps = {
  active: false,
};

// Typechecking props for the SidenavCollapse
SidenavCollapse.propTypes = {
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  children: PropTypes.string
};

export default SidenavCollapse;
