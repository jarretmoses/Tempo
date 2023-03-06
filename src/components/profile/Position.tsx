import React, { FC } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-rapi-ui';
import { FontAwesome } from '@expo/vector-icons';

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
  onDelete(index: number): void;
}

export const Position: FC<IPositionProps> = ({
  onChange,
  allPositions,
  index,
  title,
  pay,
  onDelete,
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
        containerStyle={{ flexBasis: '60%' }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          onChangeText={handlePayChange}
          value={pay}
          placeholder="$20/hr"
          containerStyle={{ flexBasis: '32.5%' }}
        />
        <TouchableOpacity
          disabled={index === 0}
          onPress={() => onDelete(index)}
          style={{ marginLeft: 4 }}
        >
          <FontAwesome
            name="trash-o"
            size={24}
            color="red"
            style={{
              opacity: index === 0 ? 0.3 : 1,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
