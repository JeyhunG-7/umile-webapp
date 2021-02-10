import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const Theme = createMuiTheme({
  palette: {
    primary: {
        main: '#2993ec',
      },
    secondary: {
      main: green[500],
    },
  },
});

export default Theme;