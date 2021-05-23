import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import {Navbar} from './components/Navbar'
import {Loader} from './components/Loader'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors'
import CustomSnackbar from './components/Snackbar'
import Container from '@material-ui/core/Container';

const theme = createMuiTheme({
    palette: {
      primary: {
          main: blue.A700
      },
      secondary: {
        main: blue[400]
      },
      error: {
          main: red.A700
      }
    },
});

function App() {
    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if (!ready) {
        return <Loader />
    }

    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <AuthContext.Provider value={{
                    token, login, logout, userId, isAuthenticated
                }}>
                    <Router>
                        { isAuthenticated && <Navbar /> }
                        <Container style={{marginTop: '2rem'}}>
                            <div className="container">
                                {routes}
                            </div>
                        </Container>
                        <CustomSnackbar />
                    </Router>
                </AuthContext.Provider>
            </ThemeProvider>
        </React.StrictMode>
    )
}

export default App
