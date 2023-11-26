import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useContext, useState } from 'react';
import { api } from '../hooks/useApi';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import { formatDate } from '../utils/formatDate';
import { formatCPF } from '../utils/formatCpf';
import { isValidEmail } from '../utils/isValidEmail';

import { parse, isFuture } from 'date-fns';
import { Loading } from '../components/Loading';

export function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthday, setBirthday] = useState('');

  const [isLoading, setIsloading] = useState(false);

  const navigation = useNavigation();
  const auth = useContext(AuthContext);

  async function handleRegister() {
    const cpfWithoutFormat = cpf.replace(/\D/g, '');

    console.log({
      username,
      email,
      password,
      birthday,
      cpfWithoutFormat,
      confirmPassword,
    });

    try {
      setIsloading(true);

      if (
        !username ||
        !email ||
        !password ||
        !confirmPassword ||
        !cpf ||
        !birthday
      ) {
        alert('Todos os campos são obrigatórios.');
        setIsloading(false);

        return;
      }

      const usernameParts = username.split(' ');
      if (usernameParts.length < 2) {
        alert('O campo username deve conter um nome e um sobrenome.');
        setIsloading(false);

        return;
      }

      const birthdayDate = parse(birthday, 'dd/MM/yyyy', new Date());

      if (isFuture(birthdayDate)) {
        alert('Insira uma data válida.');
        setIsloading(false);

        return;
      }

      if (!isValidEmail(email)) {
        alert('Por favor, insira um endereço de e-mail válido.');
        setIsloading(false);

        return;
      }

      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;

      if (!passwordRegex.test(password)) {
        alert('A senha deve conter pelo menos uma letra e um número.');
        setIsloading(false);

        return;
      }

      if (password === confirmPassword) {
        await api.post('/api/auth/register/', {
          name: username,
          email,
          password,
          birthday,
          cpf: cpfWithoutFormat,
        });
      } else {
        alert('Senha incorreta');
      }

      if (email && password) {
        const isLogged = await auth.signin(email, password);

        if (isLogged) {
          setUsername('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setCpf('');
          setBirthday('');

          navigation.navigate('user');
        }
      }
    } catch (err) {
      console.log('error', err);
    } finally {
      setIsloading(false);
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
            <Text className="text-[32px] font-extrabold">Criar uma conta</Text>

            <View className="pt-[18px] gap-[4px] mb-[36px]">
              <View>
                <Text className="text-[18px] mb-[9px]">Username</Text>
                <Input value={username} onChangeText={setUsername} />
              </View>

              <View>
                <Text className="text-[18px] mb-[9px]">CPF</Text>

                <Input
                  value={cpf}
                  keyboardType="number-pad"
                  onChangeText={(value) => setCpf(formatCPF(value))}
                />
              </View>

              <View>
                <Text className="text-[18px] mb-[9px]">
                  Data de aniversário
                </Text>
                <Input
                  value={birthday}
                  keyboardType="number-pad"
                  onChangeText={(value) => setBirthday(formatDate(value))}
                />
              </View>

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

              <View>
                <Text className="text-[18px] mb-[9px]">Confirmar senha</Text>
                <Input
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={true}
                />
              </View>
            </View>

            <Button onPress={handleRegister}>Cadastrar</Button>
          </SafeAreaView>
        </ScrollView>
      )}
    </>
  );
}
