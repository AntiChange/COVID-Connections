import * as React from 'react';
import { Button, TextInput } from 'react-native-paper';

const MyComponent = () => {
  const [text, setText] = React.useState('');

  return (
    <TextInput
      label="Add a user..."
      value={text}
      onChangeText={text => setText(text)}
    />
    
  );
  
};

export default MyComponent;