import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Button as NativeButton,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MainStackParamList } from '../types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Layout, Text, TextInput } from 'react-native-rapi-ui';
import { supabase } from '../initSupabase';
import { updateUserProfile } from '../api/updateUserProfile';
import { useAuth } from '../provider/AuthProvider';

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
  },
});

const formSchema = Yup.object().shape({
  companyName: Yup.string().required('Required'),
  companyType: Yup.string().required('Required'),
  about: Yup.string().required('Required'),
});

const Spacer = () => <View style={{ marginBottom: 12 }} />;

const ErrorMessage = ({ message }: { message: string }) => (
  <View style={{ marginTop: 8 }}>
    <Text style={{ color: 'red' }}>{message}</Text>
  </View>
);

const Profile = ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, 'MainTabs'>) => {
  const { user } = useAuth();
  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: 20,
          }}
        >
          <Formik
            validationSchema={formSchema}
            initialValues={{
              companyName: '',
              about: '',
            }}
            onSubmit={async (payload) => {
              try {
                await updateUserProfile({
                  userId: user!.id,
                  payload,
                });
              } catch (err) {}
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View>
                <Text style={styles.label}>Company Name</Text>
                <TextInput
                  onChangeText={handleChange('companyName')}
                  onBlur={handleBlur('companyName')}
                  value={values.companyName}
                  placeholder="Company Name"
                />
                {errors.companyName && (
                  <ErrorMessage message={errors.companyName} />
                )}
                <Spacer />
                <Text style={styles.label}>About Company</Text>
                <TextInput
                  onChangeText={handleChange('about')}
                  onBlur={handleBlur('about')}
                  value={values.about}
                  placeholder="Based in New York"
                  multiline
                  containerStyle={{ paddingTop: 6 }}
                />
                {errors.about && <ErrorMessage message={errors.about} />}
                <Spacer />
                <Button
                  onPress={() => {
                    handleSubmit();
                  }}
                  text="Submit"
                />
              </View>
            )}
          </Formik>
          <NativeButton
            onPress={async () => {
              await supabase.auth.signOut();
            }}
            title="Logout"
          />
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default Profile;
