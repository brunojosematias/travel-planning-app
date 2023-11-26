// import { TextProps } from 'react-native';

import { styled } from 'nativewind';
import { Text, TouchableOpacityProps } from 'react-native';
import { TouchableOpacity } from 'react-native';

type Props = TouchableOpacityProps & {
  children: string;
  smallText?: boolean;
};

export function ButtonStyled({ children, smallText, ...rest }: Props) {
  return (
    <TouchableOpacity
      className="w-full bg-green-500 h-[38px] rounded-[15px] justify-center items-center"
      {...rest}
    >
      <Text className={`t text-white ${smallText ? 'text-[15px]' : 'ext-xl'}`}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const Button = styled(ButtonStyled);
export { Button };
