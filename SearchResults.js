'use strict';

import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    FlatList,
    Text,
} from 'react-native'

type Props = {};
export default class SearchResults extends Component<Props> {
    static navigationOptions = {
        oneLine: 'Results',
    };

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({item}) => {
        return (
            <TouchableHighlight
                underlayColor='#dddddd'>
                <View>
                    <Text>{item.address.oneLine}</Text>
                </View>
            </TouchableHighlight>
        );
    };

    render() {
        const { params } = this.props.navigation.state;
        return (
            <FlatList
                data={params.property}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}/>
        );
    }
}
