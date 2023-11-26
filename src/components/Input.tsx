import { styled } from 'nativewind';
import { TextInputProps } from 'react-native';

import { TextInput } from 'react-native';

export function InputStyled({ ...rest }: TextInputProps) {
  return (
    <TextInput
      className="w-full h-[38px] bg-white shadow-xl px-2 rounded-[5px] focus:border-green-500 focus:border-[1px]"
      {...rest}
    />
  );
}

const Input = styled(InputStyled);
export { Input };
