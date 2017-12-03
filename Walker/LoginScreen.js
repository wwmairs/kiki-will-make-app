export class LoginScreen extends React.Component {
  static navigationOptions = {
    title: "Login",
  };
  constructor(props) {
    super(props);
//    this.unsubscribe = null;
    this.state = {email: "",
                  password: "",
                  error:"",
                  loading: false,
                  message: "",
                };

//  this.itemsRef = firebaseApp.database().ref();
  };
   onLoginPress() {
        const {navigate} = this.props.navigation;
        this.setState({ error: "", loading: true });
        console.log("login pressed");

        const { email, password } = this.state;
        console.log(email);
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => { this.setState({ error: "", loading: false });
                          console.log("bitch im authenticated");
                          navigate("Directions");
              })
            .catch(() => {
              console.log("login didnt work");
                //Login was not successful, let"s create a new account
              navigate("Signup", {email: this.state.email});
                
            });
    }

  componentDidMount() {
  const {navigate} = this.props.navigation;
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("HI IM HERE TOOO BITCH IN COMPONENTDIDMOUNT")
        console.log("what the fuck is user", user)
        navigate("Directions")
      }
    })
  }

  render () {
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex:1}}>
        <View style={{
          flex:4,  //#b0e0e6
          backgroundColor: "#3498db", 
          padding: 3,
          alignItems: "center",
          justifyContent: "center",
        }}>
              <Text style = {styles.title}> Walker App! </Text>
              <TextInput
                style={styles.input}
                placeholder="email"
                placeholderTextColor = "rgba(255,255,255,0.7)"

                onChangeText={(email) => this.setState({email})}
              />
              <TextInput
                style={styles.input}
                placeholder="password"
                placeholderTextColor = "rgba(255,255,255,0.7)"
                secureTextEntry
                onChangeText={(password) => this.setState({password})}
              />
              <TouchableOpacity style={styles.buttonContainer}>
                  <Button
                    onPress={() => navigate("Signup", {name: this.state.email})}

                    style = {styles.buttonText}
                    title="SIGNUP"
                    accessibilityLabel="Click this shit to login"
                  />

                  <Button
                   // onPress={() => navigate("Directions", {name: this.state.email})}
                   onPress={this.onLoginPress.bind(this)}

                    style = {styles.buttonText}
                    title="LOGIN"
                    accessibilityLabel="Click this shit to login"
                  />
              </TouchableOpacity>

         </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: "#FFF",
    width: 300,
    textAlign: "center",
    opacity:0.9,
    fontWeight: "bold",
    fontSize: 35,
    marginBottom:40,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  input: {
    height: 40,
    width: 160,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom:20,
    color: 255,
    paddingHorizontal:10,
    justifyContent: "center",
  },

  buttonContainer: {
    backgroundColor: "#c9e9ff",
    justifyContent: "center",
  },

  buttonText :{
    textAlign: "center",
    color: "#FFFFFF"
  },
  startButton: {
    bottom: 5
  },
  contactList: {
    height: 50,
  },
});