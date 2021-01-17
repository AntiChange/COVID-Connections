import * as React from 'react';
import { Button, TextInput } from 'react-native-paper';

global.passwordText;
const PasswordField = () => {
  const [passwordText, setText] = React.useState('');

  
  return (
    <TextInput
      label="Password"
      value={passwordText}
      onChangeText={passwordText => setText(passwordText)}
      
    />
  );
};

export default PasswordField;