import React, { createRef, FC, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Button, Text, TextInput } from 'react-native-rapi-ui';
import { updateUserProfile } from '../../api/updateUserProfile';
import { Position } from '../profile/Position';

const Spacer = () => <View style={{ marginBottom: 12 }} />;

const ErrorMessage = ({ message }: { message: string }) => (
  <View style={{ marginTop: 8 }}>
    <Text style={{ color: 'red' }}>{message}</Text>
  </View>
);

const formSchema = Yup.object().shape({
  companyName: Yup.string().required('Required'),
  companyType: Yup.string().required('Required'),
  about: Yup.string().required('Required'),
  positions: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Required'),
      pay: Yup.string(),
    })
  ),
});

interface IOwnerProfileFormProps {
  userId: string;
  initialFormValues?: Tempo.IOwnerFormData;
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
  },
  positionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export const OwnerProfileForm: FC<IOwnerProfileFormProps> = ({
  userId,
  initialFormValues,
}) => {
  const formRef = createRef<FormikProps<Tempo.IOwnerFormData>>();

  useEffect(() => {
    if (initialFormValues) {
      formRef.current?.setValues(initialFormValues);
    }

    return () => formRef.current?.resetForm();
  }, [formRef.current, initialFormValues]);

  return (
    <Formik
      innerRef={formRef}
      validationSchema={formSchema}
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        companyName: '',
        companyType: '',
        about: '',
        positions: [
          {
            title: '',
            pay: '',
          },
        ],
      }}
      onSubmit={async (payload) => {
        try {
          await updateUserProfile({
            userId,
            payload,
          });
        } catch (err) {
          console.error(JSON.stringify(err));
        }
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
            textContentType="organizationName"
          />
          {errors.companyName && <ErrorMessage message={errors.companyName} />}
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
          <Text style={styles.label}>Positions</Text>
          {values.positions.map(({ title, pay }, index) => (
            <Position
              key={`${title}:${index}`}
              title={title}
              pay={pay}
              index={index}
              onChange={handleChange}
              allPositions={values.positions}
            />
          ))}
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
  );
};
