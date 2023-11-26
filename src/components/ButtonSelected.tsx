import { styled } from 'nativewind';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
};

export function ButtonSelectedStyled({ title }: Props) {
  return (
    <TouchableOpacity className="bg-white border-gray-400 border-[1px] rounded-[10px] w-[100px]">
      <Text className=" text-gray-500 font-semibold text-[10px] text-center py-3">
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const ButtonSelected = styled(ButtonSelectedStyled);
export { ButtonSelected };
