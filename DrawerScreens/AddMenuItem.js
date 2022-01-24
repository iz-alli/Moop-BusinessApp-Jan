import React, { Component } from 'react';
 
import { StyleSheet, Alert, View, Button, Picker,Text,TextInput,TouchableOpacity,Modal, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ImgToBase64 from 'react-native-image-base64';
import Font from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
//import { ImagePicker, launchImageLibrary, launchCamera, showImagePicker } from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
var img;
var data;

const options = {
  title: 'Moop Business',
  takePhotoButtonTitle: 'Take Photo',
  chooseFromLibraryButtonTitle: 'Choose From Photo Library',
};
export default class AddMenuItem extends Component{
 
  constructor(props){ 
    super(props); 

    var itemNameInfo;
    var alterNameInfo;
    var menuimageInfo;
    var priceInfo;
    var priceTypeInfo;
    var menuTypeInfo;
    var categoryInfo;
    var modifiersInfo;
    var taxesInfo;
    var descriptionInfo;
    var menuItemIdInfo;

    this.state={ 
      PickerValueHolder : '' 
    }
    this.state = {
      TextInputValue: ''
    }
    this.state = {
      TextInputValue1: '',      
    }    
  }

  componentWillMount(){
    
      this.props.navigation.addListener('focus', () => {
      console.log("componentWillMount") 
      this.oper = this.props.route.params?.operation ?? 'add'
      if(this.oper === "update")
      {
        console.log("update")
        this.menuItemIdInfo = this.props.route.params?.data.item.id ?? 'Menuitem';
        console.log('*** UpdateMenuItem ', this.menuItemIdInfo);
        
        this.itemNameInfo = this.props.route.params?.data.item.itemname ?? 'ItemName';
        this.alterNameInfo = this.props.route.params?.data.item.altername ?? 'AlterName';
        this.priceInfo = this.props.route.params?.data.item.price ?? 'PriceInfo';
        this.menuTypeInfo = this.props.route.params?.data.item.menutype ?? 'MenuType';
        this.priceTypeInfo = this.props.route.params?.data.item.pricetype ?? 'PriceType';
        this.categoryInfo = this.props.route.params?.data.item.category ?? 'Category';
        this.modifiersInfo = this.props.route.params?.data.item.modifiers ?? 'Modifiers';
        this.taxesInfo = this.props.route.params?.data.item.taxes ?? 'Taxes';
        this.descriptionInfo = this.props.route.params?.data.item.description ?? 'Description';

        this.setState({itemName: this.itemNameInfo}); 
        this.setState({alterName: this.alterNameInfo});
        this.setState({price: this.priceInfo});
        this.setState({priceType: this.priceTypeInfo});
        this.setState({menuType: this.menuTypeInfo});
        this.setState({category: this.categoryInfo});
        this.setState({modifiers: this.modifiersInfo});
        this.setState({taxes: this.taxesInfo});
        this.setState({description: this.descriptionInfo});
        this.setState({menu_item_id: this.menuItemIdInfo});
        }
        else{
          console.log("add")
          this.setState({itemName: ''}); 
          this.setState({alterName: ''});
          this.setState({price: ''});
          this.setState({priceType: ''});
          this.setState({menuType: ''});
          this.setState({category: ''});
          this.setState({modifiers: ''});
          this.setState({taxes: ''});
          this.setState({description: ''});
          this.setState({menu_item_id: ''});
        }
    });    
  }

  componentDidMount() {        
    this.props.navigation.addListener('focus', () => {
      console.log("componentDidMount")  
      this.displayData();

      console.log("data1", this.menuItemIdInfo)
      console.log("data1", this.itemNameInfo)
      console.log("data1", this.alterNameInfo)
      console.log("data1", this.priceInfo)
      console.log("data1", this.menuTypeInfo)
      console.log("data1", this.priceTypeInfo)
      console.log("data1", this.categoryInfo)
      console.log("data1", this.modifiersInfo)
      console.log("data1", this.taxesInfo)
      console.log("data1", this.descriptionInfo)

    });
    //this.fetchData();     
  }

  displayData = async () => {
    try {
      let id = await AsyncStorage.getItem('user_id');
      console.log("HomeScreen Parse ID - ", id)
      this.setState({userId: id});            
    } catch (error) {
      Alert.alert(error);
    }
  };
 
  GetSelectedPickerItem=()=>{ 
    Alert.alert(this.state.PickerValueHolder);
  }

  state = {  
    isVisible: true, //state of modal default false  
    itemName: '',
    alterName:'',
    price:'',
    priceType:'',
    menuType:'',
    category:'',
    modifiers:'',
    taxes:'',
    description:'',
    menu_item_id:'',
    userId: '',
    avatarSource: null,
  }  
  buttonClickListener = () =>{
    const { TextInputValue }  = this.state;       
    const {TextInputValue1} = this.state;
}

addOrder =()=>{
  console.log("Operation", this.oper)
  var userID = this.state.userId;
  console.log('1',userID)
  userID = userID.replace(/\"/g, '');
    console.log('2',userID)
    
  if(this.oper === "add")
  {
      console.log("Add Operation")
      console.log(global.image)
      var dataToSend = {
        user_id:userID,
        rest_id:3,
        itemname:this.state.itemName,
        altername:this.state.alterName,
        menuimage:global.image,
        price:this.state.price,
        pricetype:this.state.priceType,
        menutype:this.state.menuType,
        category:this.state.category,
        modifiers:this.state.modifiers,
        taxes:this.state.taxes,
        description:this.state.description,
        status:'1',
        seats:'3',   
      };
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
    
      fetch('http://testweb.izaap.in/moop/api/index.php/service/menuitems/add?X-API-KEY=MoopApp2021@!', {
        method: 'POST',
        body: formBody,
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //Hide Loader
          //setLoading(false);
          console.log(responseJson);
          // If server response message same as Data Matched
          if (responseJson.status == "success") {
            Alert.alert('Menu Item has been Added successfully');
            console.log('Menu Item has been Added successfully');
            this.props.navigation.navigate('MenuItemStack',{Screen:'MenuItem'})
          } else {
            setErrortext('Error');
          }
        })
        .catch((error) => {
          //Hide Loader
          //setLoading(false);
          console.error(error);
        });
  }
  else{
    console.log("Update Operation")
    var dataToSend = {
      user_id:userID,
      rest_id:3,
      itemname:this.state.itemName,
      altername:this.state.alterName,
      menuimage:global.image,
      price:this.state.price,
      pricetype:this.state.priceType,
      menutype:this.state.menuType,
      category:this.state.category,
      modifiers:this.state.modifiers,
      taxes:this.state.taxes,
      description:this.state.description,
      status:'1',
      seats:'3',  
      menu_item_id:this.state.menu_item_id, 
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
  
    fetch('http://testweb.izaap.in/moop/api/index.php/service/menuitems/update?X-API-KEY=MoopApp2021@!', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        //setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status == "success") {
          Alert.alert('Menu Item has been Updated successfully');
          console.log('Menu Item has been Updated successfully');
          this.props.navigation.navigate('MenuItemStack',{Screen:'MenuItem'})
        } else {
          setErrortext('Error');
        }
      })
      .catch((error) => {
        //Hide Loader
        //setLoading(false);
        console.error(error);
      });
  }
  
}

//Image picker - Photo from gallery or Take Photo - converted to byte64 and saved to global variable and show it in UI
myfun = () => {
   
  ImagePicker.launchImageLibrary({
    mediaType: 'photo',
    includeBase64: true,
    maxHeight: 500,
    maxWidth: 500,
    quality: 1,
  }, (res) => {

    console.log('Response = ', res.assets[0].base64);
    console.log('Options = ', options);
   
    if (res.didCancel) {
      console.log('User cancelled image picker');
    } else if (res.error) {
      console.log('ImagePicker Error: ', res.error);
    } else if (res.customButton) {
      console.log('User tapped custom button: ', res.customButton);
      alert(res.customButton);
    } else {
      console.log('2222') 
      const source = {uri: 'data:image/jpeg;base64,' + res.assets[0].base64};
          global.image = res.assets[0].base64;      
          //global.front = source    
          //saving byte64 to a global variable.
          this.setState({
            avatarSource: source,
            //data: response.data,
          });
    }
  });

};



 render() {
  const withImage = (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          backgroundColor: 'transparent',
          margin: 10,
          marginLeft: -140,
          marginTop: -10,
          padding: 10,            
          height: 250,
          width: 250,
          position: 'absolute',
        }}
        onPress={this.myfun}>
        <Image
          source={this.state.avatarSource}
          resizeMode={'cover'}
          style={{
            borderRadius: 10,
            width: 250,
            height: 250,
            margin: 10,
            backgroundColor: 'transparent',
          }}
        />
      </TouchableOpacity>
    </View>
  );

  //UI of withoutimage
  const withOutImage = (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          backgroundColor: 'transparent',
          margin: 10,
          marginLeft: -120,
          marginTop: -10,
          padding: 10,
          height: 250,
          width: 250,
          position: 'absolute',
        }}
        onPress={this.myfun}
      />
    </View>
  );

  if (this.state.avatarSource) {
    img = withImage;
  } else {
    img = withOutImage;
  }

   return (
        <View style={styles.container}>
        <View>
        <ScrollView> 

       
            
        <View style={styles.spacing}>
            <TouchableOpacity onPress={() => this.myfun()}>              
                <View style={styles.gradientPhoto}>
                <View style={styles.imgPosition}>{img}</View>
                <View style={styles.featherViewPhoto}>
                  <View>
                    <Font
                      name="camera"
                      size={50}
                      color="#E5E7E9"
                      activeOpacity="0.5"
                      style={styles.feather}
                    />
                  </View>
                  <Text style={styles.textConfirm}>Take a Photo</Text>
                </View>
                </View>
             
            </TouchableOpacity>
          </View>

              <View style={{flexDirection: 'row',top:20}}>
                    <Text style={{  flex: 1, padding: 10, fontSize:18, fontWeight:'bold'}}>
                    {'Item Name'}
                    </Text>   
                    <TextInput
                        placeholder='Item Name'
                        placeholderTextColor='grey'
                        onChangeText={(itemName) => this.setState({ itemName })}
                        value={this.state.itemName}
                        style={{
                        borderWidth: 1,
                        borderRadius:10,
                        borderColor: '#000',
                        flex: 1,
                        padding: 15,
                        //right:70,
                        width:100,
                        height:50   
                        }}
                    />
              </View>

              <View style={{height: 10}} />

              <View style={{flexDirection: 'row',top:20}}>
                    <Text style={{  flex: 1, padding: 10, fontSize:18, fontWeight:'bold'}}>
                    {'Alter Name'}
                    </Text>   
                    <TextInput
                        placeholder='Alter Name'
                        placeholderTextColor='grey'
                        onChangeText={(alterName) => this.setState({ alterName })}
                        value={this.state.alterName}
                        style={{
                        borderWidth: 1,
                        borderRadius:10,
                        borderColor: '#000',
                        flex: 1,
                        padding: 15,
                        //right:70,
                        width:100,
                        height:50   
                        }}
                    />
              </View>

              <View style={{height: 10}} />

              <View style={{flexDirection: 'row',top:20}}>
                    <Text style={{  flex: 1, padding: 10, fontSize:18, fontWeight:'bold'}}>
                    {'Price'}
                    </Text>   
                    <TextInput
                        placeholder='Price'
                        keyboardType='numeric'
                        placeholderTextColor='grey'

                      onChangeText={(price) => {
                        var s = `$${price}`
                        console.log("**",s)
                        this.setState({price})
                      }
                    }


                        value={this.state.price}
                        style={{
                        borderWidth: 1,
                        borderRadius:10,
                        borderColor: '#000',
                        flex: 1,
                        padding: 15,
                        //right:70,
                        width:100,
                        height:50   
                        }}
                    />
              </View>

              <View style={{height: 10}} />

              <View style={{flexDirection: 'row',top:20}}>
                    <Text style={{  flex: 1, padding: 10, fontSize:18, fontWeight:'bold'}}>
                    {'Price Type'}
                    </Text>   
                    <TextInput
                        placeholder='Price Type'
                        keyboardType='numeric'
                        placeholderTextColor='grey'
                        onChangeText={(priceType) => this.setState({ priceType })}
                        value={this.state.priceType}
                        style={{
                        borderWidth: 1,
                        borderRadius:10,
                        borderColor: '#000',
                        flex: 1,
                        padding: 15,
                        //right:70,
                        width:100,
                        height:50   
                        }}
                    />
              </View>

              <View style={{height: 10}} />

              <View style={{flexDirection: 'row',top:20}}>
                    <Text style={{  flex: 1, padding: 10, fontSize:18, fontWeight:'bold'}}>
                    {'Menu Type'}
                    </Text>   
                    <TextInput
                        placeholder='Menu Type'
                        placeholderTextColor='grey'
                        keyboardType='numeric'
                        onChangeText={(menuType) => this.setState({ menuType })}
                        value={this.state.menuType}
                        style={{
                        borderWidth: 1,
                        borderRadius:10,
                        borderColor: '#000',
                        flex: 1,
                        padding: 15,
                        //right:70,
                        width:100,
                        height:50   
                        }}
                    />
              </View>

              <View style={{height: 10}} />

              <View style={{flexDirection: 'row',top:20}}>
                    <Text style={{  flex: 1, padding: 10, fontSize:18, fontWeight:'bold'}}>
                    {'Category'}
                    </Text>   
                    <TextInput
                        placeholder='Category'
                        keyboardType='numeric'
                        placeholderTextColor='grey'
                        onChangeText={(category) => this.setState({ category })}
                        value={this.state.category}
                        style={{
                        borderWidth: 1,
                        borderRadius:10,
                        borderColor: '#000',
                        flex: 1,
                        padding: 15,
                        //right:70,
                        width:100,
                        height:50   
                        }}
                    />
              </View>

              <View style={{height: 10}} />

              <View style={{flexDirection: 'row',top:20}}>
                    <Text style={{  flex: 1, padding: 10, fontSize:18, fontWeight:'bold'}}>
                    {'Modifiers'}
                    </Text>   
                    <TextInput
                        placeholder='Modifiers'
                        placeholderTextColor='grey'
                        onChangeText={(modifiers) => this.setState({ modifiers })}
                        value={this.state.modifiers}
                        style={{
                        borderWidth: 1,
                        borderRadius:10,
                        borderColor: '#000',
                        flex: 1,
                        padding: 15,
                        //right:70,
                        width:100,
                        height:50   
                        }}
                    />
              </View>

              <View style={{height: 10}} />

              <View style={{flexDirection: 'row',top:20}}>
                    <Text style={{  flex: 1, padding: 10, fontSize:18, fontWeight:'bold'}}>
                    {'Taxes'}
                    </Text>   
                    <TextInput
                        placeholder='Taxes'
                        keyboardType='numeric'
                        placeholderTextColor='grey'
                        onChangeText={(taxes) => this.setState({ taxes })}
                        value={this.state.taxes}
                        style={{
                        borderWidth: 1,
                        borderRadius:10,
                        borderColor: '#000',
                        flex: 1,
                        padding: 15,
                        //right:70,
                        width:100,
                        height:50   
                        }}
                    />
              </View>

              <View style={{height: 10}} />

              <View style={{flexDirection: 'row',top:20}}>
                    <Text style={{flex: 1, padding: 10, fontSize:18, fontWeight:'bold'}}>
                    {'Description '}
                    </Text>   
                    <TextInput
                        placeholder='Description'
                        placeholderTextColor='grey'
                        onChangeText={(description) => this.setState({ description })}
                        value={this.state.description}
                        style={{
                            borderWidth: 1,
                            borderRadius:10,
                            borderColor: '#000',
                            flex: 1,
                            padding: 15,
                            //right:70,
                            width:100,
                            height:50   
                        }}
                    />
              </View>
              <View style={{flexirection:'row', top:35}}>  
        </View>
            <TouchableOpacity style={styles.btn1}>
                <Text style={styles.btnTxt} onPress = {this.addOrder}>Add/Update Menu Item</Text>
            </TouchableOpacity>
            </ScrollView>
            </View>

	    </View>
    );
   }
  }        
 

 
const styles = StyleSheet.create({ 
  MainContainer: 
  {
    top:20,
     width:250,
    height:120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius:10,
    borderColor: 'black',
    left:50,
    marginTop: (Platform.OS === 'ios') ? 20 : 0
  },
 container: {
  flex: 1,
  alignItems: 'center',
  backgroundColor: 'white',
  //marginTop: 10,
  marginRight:1, 
},
btn1:{
  height:40,
  width:250,    
  fontWeight:'bold',        
  borderWidth:2,
  borderRadius:10,
  marginLeft:50,
  bottom:20,
  marginTop:100,
  justifyContent:'center',
  alignItems:'center',
},
btnTxt:{
color:'black',
fontWeight:'bold',
fontSize:20,
},
btn:{
    height:40,
    width:120,            
    borderWidth:2,
    borderRadius:80,
    fontWeight:'bold',        
    marginLeft:100,
    marginTop:90,
    justifyContent:'center',
    alignItems:'center',
},
conta: {  
  alignItems: 'center',  
  justifyContent: 'center',  
  backgroundColor: '#ecf0f1',  
},  
modal: {  
justifyContent: 'center',  
alignItems: 'center',   
backgroundColor : "#00BCD4",   
height: 250 ,  
width: '70%',  
borderRadius:10,  
borderWidth: 2,  
borderColor: '#fff',    
marginTop: 80,  
marginLeft: 40,  
top:50, 
 },  
 text: {  
    color: '#3f2949',  
    marginTop: 10 ,
    bottom:30,
    fontSize:20,    
   } ,

   spacing: {
    paddingBottom: 10,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  gradient: {
    width: '100%',
    height: 80,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientPhoto: {
    width: '100%',
    height: 250,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgPosition: {
    marginTop: -120,
    backgroundColor: 'red',
    borderRadius: 20,
  },
  featherViewPhoto: {
    marginTop: -275,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feather: {
    opacity: 0.3,
  },
  textConfirm: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    position: 'absolute',
    color: '#626567',
    fontWeight: 'bold',
    fontSize: 20,
    opacity: 0.8,
  },
  gradientPhoto: {
    width: '100%',
    height: 250,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 10,
    backgroundColor: '#F2F3F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
 


/*
<View style={styles.spacing}>
                <TouchableOpacity onPress={() => this.myfun()}>              
                    <View style={styles.gradientPhoto}>
                      <View style={styles.imgPosition}>{img}</View>
                      <View style={styles.featherViewPhoto}>
                        <View>
                          <Font
                            name="camera"
                            size={50}
                            color="#E5E7E9"
                            activeOpacity="0.5"
                            style={styles.feather}
                          />
                        </View>
                        <Text style={styles.textConfirm}>Take a Photo</Text>
                      </View>
                    </View>                
                </TouchableOpacity>
              </View>         

               <Button onPress={() =>
                  ImagePicker.launchImageLibrary(
                    {
                      mediaType: 'photo',
                      includeBase64: false,
                      maxHeight: 200,
                      maxWidth: 200,
                    },
                    (response) => {
                      console.log(response);
                      this.setState({resourcePath: response});
                    },
                  )
              }
              title="Select Image"/>  
*/