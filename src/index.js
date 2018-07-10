import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import Routes from "./route";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [Routes[0]],
      themeColor: props.themeColor,
      currency: props.currency,
      balance: props.balance
    };
  }
  navigation = {
    navigate: screen => {
      const { routes } = this.state;
      for (let i = 0; i < Routes.length; i++) {
        if (Routes[i].name === screen) {
          routes.push(Routes[i]);
          return this.setState({ routes });
        }
      }
    },
    goBack: () => {
      const { routes } = this.state;
      if (routes.length > 0) {
        routes.pop();
        this.setState({ routes });
      }
    }
  };

  select = {
    balance: () => (this.state.balance / 100).toFixed(2)
  };

  render() {
    const { routes } = this.state;
    const screens = [];
    for (let i = 0; i < routes.length; i += 1) {
      let s = (
        <View key={i} style={styles.screen}>
          {React.createElement(routes[i].screen, {
            store: {
              navigation: this.navigation,
              state: this.state,
              select: this.select
            }
          })}
        </View>
      );
      screens.push(s);
    }
    return <View style={styles.container}>{screens}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3B4A5C"
  },
  screen: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});

App.propTypes = {
  onExit: PropTypes.func,
  themeColor: PropTypes.string,
  currency: PropTypes.string,
  balance: PropTypes.number
};

App.defaultProps = {
  onExit: () => null,
  themeColor: "#3B4A5C",
  currency: "MYR",
  balance: 0
};
export default App;
