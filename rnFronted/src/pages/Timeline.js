import React, { Component } from "react";
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Tweet from '../components/Tweet';
import socket from 'socket.io-client';

import api from '../services/api';

export default class Timeline extends Component {

  state = {
    tweets: []
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Início",
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('New')}>
        <Icon style={{marginRight: 20}} name="add-circle-outline" size={24} color="#4BB0EE" />
      </TouchableOpacity>
    ),
  });

  async componentDidMount(){
    this.subscribeToEvents();
    const response = await api.get('tweets');

    this.setState({ tweets: response.data });
  }

  subscribeToEvents = () => {
    const io = socket('http://192.168.0.103:3001');

    io.on("tweet", data => {
        this.setState({
            tweets: [data, ...this.state.tweets]
        })
    })

    io.on("like", data => {
        this.setState({
            tweets: this.state.tweets.map(tweet => 
                data._id === tweet._id ? data : tweet
            )
        })
    })
}

  render() {
    return (
      <View style={styles.container}>
          <FlatList data={this.state.tweets} keyExtractor={tweet => tweet._id} renderItem={({ item }) => <Tweet tweet={item} />}>
            
          </FlatList>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});
