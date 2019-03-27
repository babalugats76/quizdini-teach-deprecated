import React, { Component } from 'react';
import { Menu, Container, Visibility } from 'semantic-ui-react';
// eslint-disable-next-line
import { Switch, Route, Link, withRouter } from 'react-router-dom';
//import { Field } from 'formik';

// eslint-disable-next-line
const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '1em',
  //marginTop: '4em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease'
};

// eslint-disable-next-line
const fixedMenuStyle = {
  backgroundColor: '#000',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
};

class FixedMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuFixed: false
    };
  }

  fixMenu = () => {
    this.setState((state, props) => {
      return { menuFixed: true };
    });
  };

  unfixMenu = () => {
    this.setState((state, props) => {
      return { menuFixed: false };
    });
  };

  render() {
    const { menuFixed } = this.state;
    const currentRoute = this.props.location.pathname;
    console.log('location', this.props.location.pathname);

    return (
      <Visibility
        onBottomPassed={this.fixMenu}
        onBottomVisible={this.unfixMenu}
        once={false}
      >
        <Menu
          fixed={menuFixed ? 'top' : undefined}
          style={menuFixed ? fixedMenuStyle : menuStyle}
          inverted
          borderless
          size='massive'
        >
          <Container>
            <Menu.Item as={Link} to='/hello' tabIndex={-1}>
              Hello, World!
            </Menu.Item>
            {currentRoute !== '/match/new' && (
              <Menu.Item as={Link} to='/match/new' tabIndex={-1}>
                New Match Game
              </Menu.Item>
            )}
          </Container>
        </Menu>
      </Visibility>
    );
  }
}

export default withRouter(FixedMenu);
