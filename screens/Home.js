import React, { Component } from "react";
import { View, Button, StyleSheet, Alert, ListView } from "react-native";
import HomeRow from "../views/HomeRow";
import Header from "../views/Header";
import axios from "axios";

class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "MNReleaseTool",
    headerRight: (
      <Button title=" + " onPress={() => navigation.navigate("New")} />
    )
  });

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      releases: [],
      dataSource: ds.cloneWithRows([])
    };
    this.setSource = this.setSource.bind(this);
    this.getReleases = this.getReleases.bind(this);
    this.handleHeaderCallback = this.handleHeaderCallback.bind(this);
    this.handleRowCallback = this.handleRowCallback.bind(this);
  }

  componentWillMount() {
    // this.getProjects();
  }

  getReleases(projectId) {
    axios
      .get("http://192.168.31.206:8080/project/" + projectId + "/releases")
      .then(response => this.setSource(response.data))
      .catch(error => console.log(error));
  }

  setSource(releases) {
    this.setState({
      releases,
      dataSource: this.state.dataSource.cloneWithRows(releases)
    });
  }

  handleHeaderCallback(projectId) {
    console.log(projectId);
    this.getReleases(projectId);
  }

  handleRowCallback(releaseId, releaseTitle) {
    this.props.navigation.navigate("Detail", {
      releaseId: releaseId,
      releaseTitle: releaseTitle
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.list}
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={data => (
            <HomeRow {...data} callbackFunc={this.handleRowCallback} />
          )}
          renderSeparator={(sectionId, rowId) => (
            <View key={rowId} style={styles.seperator} />
          )}
          renderSectionHeader={() => (
            <Header callbackFunc={this.handleHeaderCallback} projects />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  list: {},
  seperator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#8E8E8E"
  }
});

export default Home;
