import React, { useState } from "react";
import * as Linking from "expo-linking";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { supabase } from "../../initSupabase";
import { AuthStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
  RadioButton,
} from "react-native-rapi-ui";
import { Database } from "../../../@types/supabase";
import { createUserProfile } from "../../api/createUserProfile";

const Register = ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "Register">) => {
  const { isDarkmode, setTheme } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState("jobSeeker");

  async function register() {
    setLoading(true);
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { role },
        emailRedirectTo: Linking.createURL("/"),
      },
    });

    if (!error && !user) {
      setLoading(false);
      alert("Check your email for the login link!");
    } else if (!error && user) {
      try {
        const res = await createUserProfile(user.id);
        console.log("RESPONSE:::", res);
      } catch (err) {
        console.log("ERR", err);
      }
    }

    if (error) {
      setLoading(false);
      alert(error.message);
    }
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: 220,
                width: 220,
              }}
              source={require("../../../assets/images/register.png")}
            />
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
            }}
          >
            <Text
              fontWeight="bold"
              size="h3"
              style={{
                alignSelf: "center",
                padding: 30,
              }}
            >
              Register
            </Text>
            <Text>Email</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your email"
              value={email}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />

            <Text style={{ marginTop: 15 }}>Password</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your password"
              value={password}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <View
              style={{
                marginTop: 14,
              }}
            >
              <Text>I am a...</Text>
            </View>
            <View
              style={{
                marginTop: 14,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <RadioButton
                value={role === "jobSeeker" ? true : false}
                onValueChange={() => setRole("jobSeeker")}
                style={{ marginRight: 8 }}
              />
              <Text size={"md"}>Job Seeker</Text>
            </View>
            <View
              style={{
                marginTop: 14,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <RadioButton
                value={role === "owner" ? true : false}
                onValueChange={() => setRole("owner")}
                style={{ marginRight: 8 }}
              />
              <Text size={"md"}>Business Owner</Text>
            </View>
            <Button
              text={loading ? "Loading" : "Create an account"}
              onPress={() => {
                register();
              }}
              style={{
                marginTop: 20,
                zIndex: 0,
              }}
              disabled={loading}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "center",
              }}
            >
              <Text size="md">Already have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  Login here
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  isDarkmode ? setTheme("light") : setTheme("dark");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  {isDarkmode ? "☀️ light theme" : "🌑 dark theme"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default Register;
