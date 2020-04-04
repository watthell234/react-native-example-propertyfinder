import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator,
    Image,
} from 'react-native'


type Props = {};
// utility function to search for listings in real estate website
function urlForQueryAndPage(key, value, pageNumber) {
    const data = {
        propertytype: 'CONDOMINIUM',
        page: pageNumber,
        pagesize: 500,
    };
    data[key] = value;

    const querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

    return 'https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/address?' + querystring;
}

export default class SearchPage extends Component<Props> {
    static navigationOptions = {
        title: 'Property Finder',

    };
    constructor(props) {
        super(props);
        this.state = {
            searchString: '82009',
            isLoading: false,
            message: '',
        };
    }
    _onSearchTextChanged = (event) => {
        console.log('_onSearchTextChanged');
        this.setState({ searchString: event.nativeEvent.text });
        console.log('Current: ' +this.state.searchString+', Next:'+event.nativeEvent.text);
    };

    _executeQuery = (query) => {
        this.setState({ isLoading: true });
        fetch(query, {headers: {
    Accept: 'application/json', apikey: '48ed381483aabf5758717c7aa023980f'}})
        .then(response => response.json())
        .then(json => this._handleResponse(json))
        .catch(error =>
            this.setState({
                isLoading: false,
                message: 'Something bad happened ' + error
            }));
    }

    _handleResponse = (response) => {
        debugger;
        this.setState({ isLoading: false, message: ''});
        if (response.status.msg === 'SuccessWithResult') {
            this.props.navigation.navigate( 'Results', { property: response.property});
        } else {
            this.setState({ message: 'Location not recognized; please try again.'});
            }
        };


    _onSearchPressed = () => {
        const query = urlForQueryAndPage('postalcode',
    this.state.searchString, 1);
    this._executeQuery(query);
    };

    render() {
        const spinner = this.state.isLoading ? <ActivityIndicator size='large'/> : null;
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    Search for houses to buy!
                </Text>
                <Text style={styles.description}>
                    Search by postcode.
                </Text>
                <View style={styles.flowRight}>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        style={styles.searchInput}
                        value={this.state.searchString}
                        onChange={this._onSearchTextChanged}
                        placeholder='Search via postcode'/>
                    <Button
                        onPress={() => {}}
                        color='#48BBEC'
                        onPress={this._onSearchPressed}
                        title='Go'/>
                </View>
                <Image source={require('./Resources/house.png')}
                       style={styles.image} />
                {spinner}
                <Text style={styles.description}>{this.state.message}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565',
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flexGrow: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    },
    image: {
        width: 217,
        height: 138,
    },
});
