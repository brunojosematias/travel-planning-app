import axios from 'axios';

export const api = axios.create({
  // baseURL: "http://127.0.0.1:8000",
  baseURL: 'http://192.168.1.10:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useAPI = () => ({
  // validateToken: async (token: string) => {
  //   const decode: any = jwtDecode(token);
  //   const id = decode.user_id;

  //   const response = await api.get(`/api/volunteer/${id}`);

  //   // console.log(response);

  //   // return {
  //   //   user: {
  //   //     id: response.data.id,
  //   //     name: response.data.name,
  //   //     surname: response.data.surname,
  //   //     email: response.data.email,
  //   //     avatar: response.data.avatar,
  //   //     token: token,
  //   //   },
  //   // };

  //   return {
  //     user: {
  //       id: id,
  //       email: response.data.email,
  //       password: response.data.password,
  //       username: response.data.username,
  //     },
  //     token: token,
  //   };
  // },

  signin: async (email: string, password: string) => {

    try {
      const response = await api.post('/api/auth/login', { email, password });

      const userToken = response.data.data.token;

      console.log(userToken);


      return {
        user: {
          id: response.data.data.id,
          name: response.data.data.name,
          email: response.data.data.email,
          photo: response.data.data.photo,
          token: userToken
        },
        token: userToken
      };



    } catch (err) {
      console.log('Error', err);
    }

    // const decode: any = jwtDecode(userToken);
    // const id = decode.user_id;

    // const datas = await api.get(`/api/volunteer/${id}`,);

    // console.log(datas);

    // return {
    //   user: {
    //     id: datas.data.id,
    //     email: datas.data.email,
    //     password: datas.data.password,
    //     username: datas.data.name,
    //     registration: datas.data.registration
    //   },
    //   token: userToken,
    // };


  },

  logout: async () => {
    return { status: true };
  },
});