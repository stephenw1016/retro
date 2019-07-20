import { createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: grey,
  },
  status: {
    danger: 'orange',
  },
});

export default theme;
