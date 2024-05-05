import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../reducer';
import {setRecipeList} from '../reducer/recipe.reducer';
import {recipeListing} from '../recipe.mock';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';

const AddRecipe = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const recipeTypeList = useSelector(
    (state: RootState) => state.recipe.recipeTypeList,
  );
  const recipeList = useSelector((state: RootState) => state.recipe.recipeList);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState<any>(null);
  const [ingredients, setIngredients] = useState<any>(null);
  const [step, setStep] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const backgroundStyle = {
    backgroundColor:
      useColorScheme() === 'dark' ? Colors.darker : Colors.lighter,
  };
  const onPressSubmit = () => {
    handleUpload();
    console.log();
    dispatch(
      setRecipeList([
        ...(recipeList.length > 0 ? recipeList : recipeListing),
        {
          recipeTypeName: value,
          imageURI: selectedImage,
          ingredients: ingredients,
          step: step,
        },
      ]),
    );
    navigation.navigate('Listing');
  };

  const handleChoosePhoto = async () => {
    launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    })
      .then(response => {
        console.log(response);
        if (!response.didCancel && !response.errorCode) {
          setSelectedImage(response.assets?.[0].uri);
        } else {
          console.log(response);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: selectedImage.uri,
      type: selectedImage.type,
      name: selectedImage.fileName,
    });

    try {
      //  const response = await axios.post('YOUR_UPLOAD_ENDPOINT', formData, {
      //    headers: {
      //      'Content-Type': 'multipart/form-data',
      //    },
      //  });
      //  console.log('Upload successful:', response.data);
      // Handle success
    } catch (error) {
      console.error('Upload failed:', error);
      // Handle error
    }
  };
  console.log('selectedImage', selectedImage);
  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.container}>
        <TextInput
          style={styles.ingredient}
          placeholder="Enter Ingredients"
          onChangeText={newText => setIngredients(newText)}
          defaultValue={ingredients}
        />
        <TextInput
          style={styles.step}
          multiline={true}
          placeholder="Enter Step"
          onChangeText={newText => setStep(newText)}
          defaultValue={step}
        />
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={recipeTypeList}
          search
          maxHeight={300}
          labelField="recipeTypeName"
          valueField="recipeTypeName"
          placeholder={!isFocus ? 'Select Recipe Types' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.recipeTypeName);
            setIsFocus(false);
          }}
        />
        {selectedImage && (
          <View style={styles.imageContainer}>
            <Image
              source={{uri: selectedImage}}
              style={{width: 200, height: 200}}
            />
          </View>
        )}
        <Button title="Choose Photo" onPress={handleChoosePhoto} />
        {/* <Button title="Upload" onPress={handleUpload} /> */}
        <Button title="Submit" onPress={onPressSubmit} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch',
    marginHorizontal: '5%',
    marginTop: '2%',
  },
  ingredient: {
    height: 40,
  },
  step: {
    height: 80,
    marginVertical: '2%',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  imageContainer: {
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default AddRecipe;
