import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },
  reg_icon: {
    fontSize: 250,
    marginTop: '5%',
    alignItems: 'center',
    alignContent: 'center',
    color: '#cd077d',
    paddingLeft: '5%',
    paddingBottom: '1%',
  },
  icon: {
    // flex: 1,
    marginTop: '20%',
    fontSize: 250,
    alignItems: 'center',
    alignContent: 'center',
    color: '#cd077d',
    paddingLeft: '5%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#FEF2F2',
    borderRadius: 30,
    width: '99%',
    height: 45,
    marginBottom: 20,

    alignItems: 'center',
  },
  errorMessageContainerStyle: {
    marginBottom: 8,
    backgroundColor: '#fff',
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
    color: '#db2828',
    //   marginBottom: 5,
  },
  account_button: {
    textAlign: 'center',
    height: 30,
    color: '#db2828',
    // marginBottom: 10,
  },
  reg_loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#cd077d',
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#cd077d',
  },
  loginText: {
    color: '#FEF2F2',
  },
});

export default styles;
