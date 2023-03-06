import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Button as NativeButton,
} from 'react-native';
import { Layout } from 'react-native-rapi-ui';
import { supabase } from '../initSupabase';
import { useAuth } from '../provider/AuthProvider';
import { OwnerProfileForm } from '../components/profile/OwnerForm';
import { getUserProfile } from '../api/getUserProfile';

type ProfileData = {
  id: string;
  raw_profile_data: Tempo.IOwnerFormData;
};

const Profile = () => {
  const [userData, setUserData] = useState<ProfileData>();
  const { user } = useAuth();
  const fetchUserData = async () => {
    const profileData = await getUserProfile(user!.id);
    // @ts-expect-error Type this later
    setUserData(profileData.data[0] as ProfileData);
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
          <OwnerProfileForm
            userId={user!.id}
            initialFormValues={userData?.raw_profile_data}
          />
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
