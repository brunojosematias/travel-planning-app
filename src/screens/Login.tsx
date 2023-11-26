import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { isValidEmail } from '../utils/isValidEmail';
import { Loading } from '../components/Loading';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsloading] = useState(false);

  const navigation = useNavigation();
  const auth = useContext(AuthContext);

  function handleScreenRegister() {
    navigation.navigate('register');
  }

  async function handleLogin() {
    // navigation.navigate('user');

    // console.log({ email, password });
    setIsloading(true);

    if (!email || !password) {
      alert('Informe o email e a senha');
      setIsloading(false);

      return;
    }

    if (!isValidEmail(email)) {
      alert('Por favor, insira um endereço de e-mail válido.');
      setIsloading(false);

      return;
    }

    if (email && password) {
      const isLogged = await auth.signin(email, password);

      if (isLogged) {
        setEmail('');
        setPassword('');

        setIsloading(false);

        navigation.navigate('user');
      } else {
        setIsloading(false);

        alert('Dados incorretos!');
      }
    }
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <SafeAreaView className="flex-1 bg-mist-100  py-[86px] px-[25px]">
            <Text className="text-[32px] font-extrabold">Login</Text>

            <View className="pt-[16px] gap-[4px] mb-[36px]">
              <View>
                <Text className="text-[18px] mb-[9px]">E-mail</Text>
                <Input value={email} onChangeText={setEmail} />
              </View>

              <View>
                <Text className="text-[18px] mb-[9px]">Senha</Text>
                <Input
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                />
              </View>
            </View>

            <Button onPress={handleLogin}>Entrar</Button>

            <TouchableOpacity
              onPress={handleScreenRegister}
              className="justify-center items-center border-b-2 mx-20 mt-6 border-green-500"
            >
              <Text className="text-[16px]">Cadastre-se</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
      )}
    </>
  );
}
