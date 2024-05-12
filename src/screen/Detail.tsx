import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../reducer';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {setRecipeList} from '../reducer/recipe.reducer';
import {StackNavigationProp} from '@react-navigation/stack';
import {DeviceHeight, backgroundStyle} from '../../App';

const Detail = () => {
  const recipe = useSelector((state: RootState) => state.recipe.recipeDetail);
  const recipeList = useSelector((state: RootState) => state.recipe.recipeList);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const styles = useStyle();

  const dispatch = useDispatch();
  return (
    <SafeAreaView style={backgroundStyle()}>
      <View style={styles.listingContainer}>
        <Image source={{uri: recipe?.imageURI}} style={styles.image} />
        <Text>Recipe Name: {recipe?.recipeName}</Text>
        <Text>Recipe Type Name: {recipe?.recipeTypeName}</Text>
        <Text>Ingredient: {recipe?.ingredients}</Text>
        <Text>Step: {recipe?.step}</Text>
        <Button
          title="Edit"
          onPress={() => navigation.navigate('RecipeForm')}
        />
        <Button
          title="Delete"
          onPress={() => {
            dispatch(
              setRecipeList(recipeList.filter(i => i.id !== recipe?.id)),
            );
            navigation.navigate('Listing');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const useStyle = (deviceHeight = DeviceHeight) =>
  StyleSheet.create({
    image: {
      width: 200,
      height: 200,
    },
    listingContainer: {
      position: 'absolute',
      top: deviceHeight * 0.15,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
export default Detail;
