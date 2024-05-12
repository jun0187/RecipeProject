import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useState} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../reducer';
import {setRecipeCounter, setRecipeList} from '../reducer/recipe.reducer';
import {recipeListing} from '../recipe.mock';
import {launchImageLibrary} from 'react-native-image-picker';
import {StackNavigationProp} from '@react-navigation/stack';
import {backgroundStyle} from '../../App';

const RecipeForm = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useDispatch();
  const recipe = useSelector((state: RootState) => state.recipe.recipeDetail);
  const recipeCounter = useSelector(
    (state: RootState) => state.recipe.recipeCounter,
  );
  const recipeTypeList = useSelector(
    (state: RootState) => state.recipe.recipeTypeList,
  );
  const recipeList = useSelector((state: RootState) => state.recipe.recipeList);
  const [isFocus, setIsFocus] = useState(false);
  const [recipeTypeName, setRecipeTypeName] = useState(
    recipe?.recipeTypeName || '',
  );
  const [recipeName, setRecipeName] = useState(recipe?.recipeName || '');
  const [ingredients, setIngredients] = useState(recipe?.ingredients || '');
  const [step, setStep] = useState(recipe?.step || '');
  const [selectedImage, setSelectedImage] = useState(recipe?.imageURI || '');

  const onPressSubmit = () => {
    dispatch(
      setRecipeList([
        ...(recipeList.length > 0
          ? recipeList.filter(i => i.id !== recipe?.id)
          : recipeListing),
        {
          id: recipe?.id ?? recipeCounter + 1,
          recipeName: recipeName,
          recipeTypeName: recipeTypeName,
          imageURI: selectedImage,
          ingredients: ingredients,
          step: step,
        },
      ]),
    );
    dispatch(setRecipeCounter(recipeCounter + 1));
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
          setSelectedImage(response.assets?.[0].uri || '');
        } else {
          console.log(response);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={backgroundStyle()}>
      <View style={styles.container}>
        <TextInput
          style={styles.item}
          placeholder="Enter Recipe Name"
          onChangeText={setRecipeName}
          defaultValue={recipeName}
        />
        <TextInput
          style={styles.item}
          placeholder="Enter Ingredients"
          onChangeText={setIngredients}
          defaultValue={ingredients}
        />
        <TextInput
          style={styles.step}
          multiline={true}
          placeholder="Enter Step"
          onChangeText={setStep}
          defaultValue={step}
          numberOfLines={4}
          maxLength={40}
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
          value={recipeTypeName}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setRecipeTypeName(item.recipeTypeName);
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
        <Button
          title="Submit"
          disabled={
            !recipeName ||
            !ingredients ||
            !step ||
            !recipeTypeName ||
            !selectedImage
          }
          onPress={onPressSubmit}
        />
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
  item: {
    height: 40,
    marginVertical: 10,
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: 'gray',
  },
  step: {
    height: 80,
    marginVertical: 10,
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: 'gray',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
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
export default RecipeForm;
