import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import Sidebar from './components/sidebar/sidebar';
import IconsCategory from './components/icons-category/icons-category';
import UpsaleCategory from './components/upsale-category/upsale-category';
import './App.css';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8080/graphql'
});
const client = new ApolloClient({
  networkInterface: networkInterface
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      ruleCategoryActive: 'upsale'
    }

    this.handleSidebarItemClicked = this.handleSidebarItemClicked.bind(this);
  }

  handleSidebarItemClicked(ruleCategory) {
    this.setState({ ruleCategoryActive: ruleCategory });

  }
  render() {
    return (
      <MuiThemeProvider>
      <ApolloProvider client={client}>
      <div className="app">
        <AppBar
          title="Rule Editor"
          showMenuIconButton={false}
        />
        <Sidebar activeItem={this.state.ruleCategoryActive} handleSidebarItemClicked={this.handleSidebarItemClicked} />
        <div className="main-view">
        {this.state.ruleCategoryActive === 'upsale' && <UpsaleCategory />}
        {this.state.ruleCategoryActive === 'icons' && <IconsCategory hotelID={'10122'} />}
        </div>
      </div>
      </ApolloProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
