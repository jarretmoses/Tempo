import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Button as NativeButton,
} from 'react-native';
import { MainStackParamList } from '../types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Layout } from 'react-native-rapi-ui';
import { supabase } from '../initSupabase';
import { useAuth } from '../provider/AuthProvider';
import { OwnerProfileForm } from '../components/profile/OwnerForm';
import { getUserProfile } from '../api/getUserProfile';

const Profile = ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, 'MainTabs'>) => {
  const [userData, setUserData] = useState();
  const { user } = useAuth();
  const fetchUserData = async () => {
    const profileData = await getUserProfile(user!.id);

    // @ts-expect-error Type this later
    setUserData(profileData.data[0] as Tempo.IOwnerFormData);
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserData();
    }
  }, [user]);

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: 20,
          }}
        >
          <OwnerProfileForm userId={user!.id} initialFormValues={userData} />
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
