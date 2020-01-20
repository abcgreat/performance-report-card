import * as React from 'react';
import './App.css';
import Dashboard from './components/Dashboard'

export interface AppProps {
}

class App extends React.Component<AppProps> {
    render() {
        return <Dashboard/>
    }
}

export default App;
