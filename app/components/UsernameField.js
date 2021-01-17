import * as React from 'react';
import { Button, TextInput } from 'react-native-paper';

const UsernameField = () => {
  const [usernameText, setText] = React.useState('');

  return (
    <TextInput
      label="Username"
      value={usernameText}
      onChangeText={usernameText => setText(usernameText)}
    />
    
  );
  
};

export default UsernameField;