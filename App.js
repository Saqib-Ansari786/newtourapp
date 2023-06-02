import { NavigationContainer, useNavigation } from "@react-navigation/native"; // NavigationContainer is used to wrap the whole app
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import CardList from "./screens/Home";
import CardDetail from "./screens/ItemScreen";
import SplashScreen from "./screens/SplashScreen";
import React from "react";
import { Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import RateScreen from "./screens/RateScreen";
import ShareScreen from "./screens/ShareScreen";
import AboutScreen from "./screens/AboutScreen";
import ConditionsScreen from "./screens/ConditionsScreen";
import ContactUsScreen from "./screens/ContactUsScreen";
import MapLocation from "./screens/MapLocation";

const Stack = createSharedElementStackNavigator(); // this is changed from simple stack to shared element stack
const Drawer = createDrawerNavigator();

const NavigatorOptions = {
  header: null,
};
function DrawerContent() {
  const navigation = useNavigation();
  const routes = [
    { name: "Home", icon: "sync-circle-outline" },
    { name: "Rate", icon: "award" },
    { name: "Share", icon: "share-social-outline" },
    { name: "About us", icon: "users" },
    { name: "General conditions", icon: "settings-outline" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#54B0F6", padding: 25 }}>
      <Text
        style={{
          color: "white",
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 16,
          marginTop: 30,
        }}
      >
        | About |
      </Text>
      <Text style={{ color: "white", fontSize: 18 }}>Nice City</Text>
      <View
        style={{
          height: 1,
          backgroundColor: "#C6E4FC",
          marginVertical: 10,
          marginBottom: 60,
        }}
      ></View>
      {routes.map((route, index) => (
        <Text
          key={index}
          style={{
            color: "white",
            fontSize: 18,
            marginBottom: 25,
          }}
          onPress={() => navigation.navigate(route.name)}
        >
          {route.icon == "award" || route.icon == "users" ? (
            <FontAwesome5 name={route.icon} size={20} color="white" />
          ) : (
            <Ionicons name={route.icon} size={20} color="white" />
          )}
          {"  "}
          {route.name}
        </Text>
      ))}
      <View
        style={{
          height: 1,
          backgroundColor: "#C6E4FC",
          marginTop: "auto",
        }}
      ></View>
      <Text
        style={{ color: "white", fontSize: 16, marginTop: 10 }}
        onPress={() => navigation.navigate("Contact Us")}
      >
        <MaterialIcons name="contact-support" size={20} color="white" />
        {"  "}
        Contact Us
      </Text>
    </View>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        component={SplashScreen}
        name="SplashScreen"
        options={NavigatorOptions}
      />
      <Stack.Screen
        name="Home"
        component={CardList}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Rate" component={RateScreen} />
      <Stack.Screen name="Share" component={ShareScreen} />
      <Stack.Screen name="About us" component={AboutScreen} />
      <Stack.Screen name="General conditions" component={ConditionsScreen} />
      <Stack.Screen name="Contact Us" component={ContactUsScreen} />
      <Stack.Screen name="MapLocation" component={MapLocation} />

      <Stack.Screen
        name="CardDetail"
        component={CardDetail}
        sharedElements={(route, otherRoute, showing) => {
          // this is used to pass the data to the CardDetail here we are passing the video to transition
          const { id } = route.params; // here we are getting the id from route.params
          return [`item.${id}.video`]; // here we are using the id to know which video is playing
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Main" component={StackNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
