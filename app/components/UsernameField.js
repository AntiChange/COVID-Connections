import * as React from 'react';
import { Button, TextInput } from 'react-native-paper';

const UsernameField = () => {
  const [text, setText] = React.useState('');

  return (
    <TextInput
      label="Username"
      value={text}
      onChangeText={text => setText(text)}
    />
    
  );
  
};

export default UsernameField;