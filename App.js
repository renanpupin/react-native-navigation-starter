/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator, getActiveChildNavigationOptions } from "react-navigation";

class UnauthorizedScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Unauthorized Screen</Text>
                {/*<Button*/}
                    {/*title="Go back"*/}
                    {/*onPress={() => this.props.navigation.goBack()}*/}
                {/*/>*/}
                <Button
                    title="Go to authorized"
                    onPress={() => this.props.navigation.navigate('Authorized')}
                />
                <Button
                    title="Open Modal"
                    onPress={() => this.props.navigation.navigate('MyModal')}
                />
            </View>
        );
    }
}

class HomePatientScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>HomePatientScreen Screen</Text>
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
                <Button
                    title="Go to chat"
                    onPress={() => this.props.navigation.navigate('Chat')}
                />
                <Button
                    title="Open Modal"
                    onPress={() => this.props.navigation.navigate('MyModal')}
                />
            </View>
        );
    }
}

class HomePsychologistScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>HomePsychologistScreen Screen</Text>
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
                <Button
                    title="Open Modal"
                    onPress={() => this.props.navigation.navigate('MyModal')}
                />
            </View>
        );
    }
}

class SharedScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Shared Screen</Text>
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
                <Button
                    title="Go to Unauthorized"
                    onPress={() => this.props.navigation.navigate('Unauthorized')}
                />
            </View>
        );
    }
}

class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Detail Screen</Text>
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
                <Button
                    title="Go to Unauthorized"
                    onPress={() => this.props.navigation.navigate('Unauthorized')}
                />
            </View>
        );
    }
}

class ChatScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Chat Screen</Text>
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
                <Button
                    title="Go to Unauthorized"
                    onPress={() => this.props.navigation.navigate('Unauthorized')}
                />
            </View>
        );
    }
}

class ModalScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30 }}>This is a modal!</Text>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Dismiss"
                />
            </View>
        );
    }
}

class InitialLoadingScreen extends React.Component {

    componentDidMount(){
        setTimeout(() => {
            this.props.navigation.navigate('Unauthorized');
        }, 1500);
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Carregando...</Text>
            </View>
        );
    }
}

export default class App extends Component<{}> {

    constructor(props){
        super(props);

        this.state = {
            type: "patient"
        };
    }

    render() {
        const CommonRoutes = {
            Details: {
                screen: DetailsScreen,
                navigationOptions: {
                    title: 'Details',
                },
            },
            Shared: {
                screen: SharedScreen,
                navigationOptions: {
                    title: 'Shared',
                },
            },
        };
        const PatientTabNavigator = createBottomTabNavigator({
            Home: {
                screen: HomePatientScreen,
                navigationOptions: {
                    title: 'HomePatientScreen',
                },
            },
            ...CommonRoutes
        }, {
            // headerMode: 'none',
            navigationOptions: ({ navigation }) => {
                const { routeName } = navigation.state.routes[navigation.state.index];

                // You can do whatever you like here to pick the title based on the route name
                const headerTitle = routeName;

                return {
                    headerTitle,
                };
            }
        });

        const PsychologistTabNavigator = createBottomTabNavigator({
            Home: {
                screen: HomePsychologistScreen,
                navigationOptions: {
                    title: 'HomePsychologistScreen',
                },
            },
            Details: {
                screen: DetailsScreen,
                navigationOptions: {
                    title: 'Details',
                },
            },
            ...CommonRoutes
        }, {
            // headerMode: 'none',
            navigationOptions: ({ navigation }) => {
                const { routeName } = navigation.state.routes[navigation.state.index];

                // You can do whatever you like here to pick the title based on the route name
                const headerTitle = routeName;

                return {
                    headerTitle,
                };
            }
        });

        let SelectedNavigator = this.state.type === "patient" ? PatientTabNavigator : PsychologistTabNavigator;

        const AuthorizedSelected = createStackNavigator({
            Home: {
                screen: SelectedNavigator,
                navigationOptions: {
                    title: 'TabNavigator',
                },
            },
            Chat: {
                screen: ChatScreen,
                navigationOptions: {
                    title: "ChatScreen"
                },
            }
            // Settings: HomePsychologistScreen,

        }, {
            headerMode: 'none',
            navigationOptions: ({ navigation, screenProps }) => ({
                ...getActiveChildNavigationOptions(navigation, screenProps),
            })
        });

        const UnauthorizedStack = createStackNavigator({
            UnauthorizedScreen: {
                screen: UnauthorizedScreen,
                navigationOptions: {
                    title: 'UnauthorizedScreen',
                    header: null
                },
            }
        }, {
            headerMode: 'none',
            navigationOptions: ({ navigation, screenProps }) => ({
                ...getActiveChildNavigationOptions(navigation, screenProps),
            })
        });

        let MainRouter = createSwitchNavigator({
            InitialLoading: {
                screen: InitialLoadingScreen,
                navigationOptions: {
                    title: 'InitialLoadingScreen',
                    header: null
                },
            },
            Unauthorized: UnauthorizedStack,
            Authorized: AuthorizedSelected,
        }, {
            navigationOptions: ({ navigation, screenProps }) => ({
                ...getActiveChildNavigationOptions(navigation, screenProps),
            })
        });

        const RootRouter = createStackNavigator(
            {
                Main: {
                    screen: MainRouter,
                    // navigationOptions: {
                    //     title: 'Main',
                    // },
                },
                // Modals: ModalRouter,
                MyModal: {
                    screen: ModalScreen,
                    navigationOptions: {
                        title: 'Modal',
                    },
                },
            },
            {
                mode: 'modal',
            }
        );

        let Container = createAppContainer(RootRouter);
        return (
            <Container/>
        );
    }
}