import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40,
  },
  // t:{
  //   marginTop:'50%',
  //   marginLeft:'45%',
  //   flex: 1,
  // },

  inputView: {
    backgroundColor: '#FDD1EB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,

    alignItems: 'center',
  },
  errorMessageContainerStyle: {
    marginBottom: 8,
    backgroundColor: '#FEF2F2',
    padding: 8,
    borderRadius: 4,
  },

  errorMessageTextStyle: {
    color: '#db2828',
    textAlign: 'center',
    fontSize: 12,
  },

  TextInput: {
    height: 50,
    width: '100%',
    flex: 1,
    padding: 0,
    //   marginLeft: "50%",
    textAlign: 'center',
  },

  forgot_button: {
    height: 30,
    textAlign: 'center',
    //   marginBottom: 5,
  },
  account_button: {
    textAlign: 'center',
    height: 30,
    // marginBottom: 10,
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#B6666F',
  },
  loginText: {
    color: 'black',
  },
});

export default styles;
