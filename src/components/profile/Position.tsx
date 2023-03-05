import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-rapi-ui';

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
  },
  positionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export interface IPosition {
  title: string;
  pay?: string;
}

interface IPositionProps extends IPosition {
  onChange(positions: IPosition[]): void;
  allPositions: IPosition[];
  index: number;
}

export const Position: FC<IPositionProps> = ({
  onChange,
  allPositions,
  index,
  title,
  pay,
}) => {
  const handleTitleChange = (newTitle: string) => {
    const position = {
      title: newTitle,
      pay,
    };

    const positions = [...allPositions];
    positions[index] = position;

    onChange(positions);
  };

  const handlePayChange = (newPay: string) => {
    const position = {
      title,
      pay: newPay,
    };

    const positions = [...allPositions];
    positions[index] = position;

    onChange(positions);
  };

  return (
    <View style={styles.positionContainer}>
      <TextInput
        onChangeText={handleTitleChange}
        value={title}
        placeholder="Cashier"
        textContentType="jobTitle"
        containerStyle={{ flexBasis: '62.5%' }}
      />
      <TextInput
        onChangeText={handlePayChange}
        value={pay}
        placeholder="$20/hr"
        containerStyle={{ flexBasis: '32.5%' }}
      />
    </View>
  );
};
