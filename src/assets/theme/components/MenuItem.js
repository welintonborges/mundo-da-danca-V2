import { useState } from 'eact';
import { Collapse, List, ListItemText } from '@mui/material';
import {collapseItem} from "../../../examples/Sidenav/styles/sidenavCollapse";

const MenuItem = ({ name, children,...props }) => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    return (

        <ListItem button onClick={handleToggle}>
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
            {children && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {children.map((child, index) => (
                            <MenuItem key={index} {...child} />
                        ))}
                    </List>
                </Collapse>
            )}
            </MDBox>
        </ListItem>
    );
};

export default MenuItem;