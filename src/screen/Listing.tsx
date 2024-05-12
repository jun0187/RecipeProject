import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setRecipeDetail, setRecipeTypeList} from '../reducer/recipe.reducer';
import {RootState} from '../reducer';
import {recipeListing} from '../recipe.mock';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {backgroundStyle} from '../../App';

const Listing = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useDispatch();
  const recipeTypeList = useSelector(
    (state: RootState) => state.recipe.recipeTypeList,
  );
  const updatedRecipeList = useSelector(
    (state: RootState) => state.recipe.recipeList,
  );
  const recipeFullListing =
    updatedRecipeList.length > 0 ? updatedRecipeList : recipeListing;
  const [recipeList, setRecipeList] = useState(recipeFullListing);

  useEffect(() => {
    setRecipeList(recipeFullListing);
  }, [recipeFullListing]);

  useEffect(() => {
    fetch('http://localhost:8080/recipetypes', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.text())
      .then(response => {
        dispatch(setRecipeTypeList(JSON.parse(response)));
      })
      .catch(err => {
        console.log('fetch', err);
      });
  }, []);

  return (
    <SafeAreaView style={backgroundStyle()}>
      <View style={styles.filterContainer}>
        {recipeTypeList.map((item, key) => {
          return (
            <TouchableOpacity
              key={key}
              onPress={() => {
                setRecipeList(
                  recipeFullListing.filter(
                    i => i.recipeTypeName === item.recipeTypeName,
                  ),
                );
              }}>
              <Text>{item.recipeTypeName}</Text>
            </TouchableOpacity>
          );
        })}
        <Button
          title="Clear"
          onPress={() => setRecipeList(recipeFullListing)}
        />
        <Button title="+" onPress={() => navigation.navigate('RecipeForm')} />
      </View>
      <ScrollView>
        {recipeList.map((item, key) => {
          return (
            <TouchableOpacity
              key={key}
              style={styles.listingContainer}
              onPress={() => {
                navigation.navigate('Detail');
                dispatch(setRecipeDetail(item));
              }}>
              <Image source={{uri: item.imageURI}} style={styles.image} />
              <Text>{item.recipeName}</Text>
              <View style={styles.horizontalLine} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  listingContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '7%',
    marginTop: '2%',
  },
  filterContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: '7%',
    marginTop: '2%',
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    width: '100%',
    marginVertical: '3%',
  },
});
export default Listing;
