import * as React from 'react';
import { Button, TextInput } from 'react-native-paper';

const PasswordField = () => {
  const [text, setText] = React.useState('');


  return (
    <TextInput
      label="Password"
      value={text}
      onChangeText={text => setText(text)}
    />
  );
};

export default PasswordField;