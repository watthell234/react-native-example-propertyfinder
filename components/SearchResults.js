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

class ListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.index);
    }

    render() {
        const item = this.props.item;
        // const price = item.price.formatted.split(' ')[0];
        return (
            <TouchableHighlight
                onPress={this._onPress}
                underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.addressOne}numberOfLines={1}>{item.address.oneLine}</Text>
                        </View>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        )
    }
}

type Props = {};
export default class SearchResults extends Component<Props> {
    static navigationOptions = {
        oneLine: 'Results',
    };

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({item, index}) => (
        <ListItem
    item={item}
    index={index}
    onPressItem={this._onPressItem}
  />
);

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

const styles = StyleSheet.create({
    textContainer: {
        flex: 10
    },
    separator: {
        height: 3,
        backgroundColor: '#000000'
    },
    addressOne: {
        fontSize: 14,
        color: '#656565'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
});
