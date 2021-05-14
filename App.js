import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal'
    }
  }

  hasCameraPermissions = async() => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status === "granted",
      buttonState: 'clicked',
      scanned: false
    });
  }

  handleBarcodeScanned = async({type,data}) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal'
    })
  }

  render() {
    if(this.state.buttonState === 'clicked' && this.state.hasCameraPermissions){
      return(
        <BarCodeScanner 
          onBarCodeScanned = {this.state.scanned ? undefined : this.handleBarcodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    else if(this.state.buttonState === 'normal'){
      return (
        <View style={styles.container}>
          <Image source={require('./assets/scanner.jpg')} style={{width:150, height:150}}/>
          <Text style={styles.scanText}>Barcode Scanner</Text>
          <TouchableOpacity style={styles.button} onPress={this.hasCameraPermissions}>
            <Text style={styles.buttonText}>Scan QR code</Text>
          </TouchableOpacity>
          
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: { 
    width: 200,
    height: 40,
    backgroundColor: 'skyblue',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    fontWeight: 'bold',
  },
  scanText: {
    fontSize: 20,
    marginTop: 20
  }
});
