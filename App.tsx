import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { MenuDetails } from './type/task.Object';
import { Alert } from 'react-native';

export default function App() {

  const [Menu, setMenu] = useState<MenuDetails[]>([
    { Food_Name: "Margherita Pizza", description: "A classic pizza topped with fresh mozzarella, ripe tomatoes, and basil on a homemade tomato sauce. Drizzled with extra virgin olive oil for a touch of richness.", course_family: "Dinner", price: 120 },
    { Food_Name: "Chocolate Lava Cake", description: "Rich chocolate cake with a molten center, served warm with vanilla ice cream and a dusting of powdered sugar. A chocolate lover's dream", course_family: "Desert", price: 75 },
    { Food_Name: "Chia Seed Pudding", description: "Chia seeds soaked overnight in almond milk, topped with fresh fruit and a drizzle of honey. A nutritious and energizing start to your day", course_family: "Breakfast", price: 80 },
  ]);

  const [FoodName, setFoodName] = useState<string>('');
  const [iteam_Description, setDescription] = useState<string>('');
  const [course_iteam_family, setType] = useState<string>('');
  const [Iteam_price, setIteam_price] = useState<string>('');
  const [Total_Meals, settotal] = useState<number>(0);

  const iteam_family = ['Breakfast', 'lunch', 'Dinner','Desert'];

  const handleSubmit = () => {
    if (FoodName && iteam_Description && course_iteam_family && Iteam_price &&  parseInt(Iteam_price) > 0) {
      const added_Menu: MenuDetails = {
        Food_Name: FoodName,
        description: iteam_Description,
        course_family: course_iteam_family,
        price: parseInt(Iteam_price)
      };
       
     
      setMenu([...Menu, added_Menu]);
      settotal(Total_Meals + added_Menu.price);
      setFoodName('');
      setDescription('');
      setType('None');
      setIteam_price('');
    }
      else if (parseInt(Iteam_price) <= 50) {
        Alert.alert("Incorrect input", "Calories need to be greater than 50", [
          { text: "OK" },
        ]);
      } else {
        Alert.alert("Incomplete form", "Please fill in all fields", [
          { text: "OK" },
        ]);
      }
  
    

  }
  const total_Meals = Menu.length
  return (

    
    <SafeAreaView style={styles.itemContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Menu</Text>
      </View> 
      
      <View style={styles.summaryContainer}>
        
        <Text style={styles.summaryHeading}> Today's Menu:</Text>
            <Text style={styles.summaryText}>Total Courses Available:{total_Meals}</Text>
            <Text style={styles.summaryText}>Total price: {Total_Meals} </Text>
      </View>
      <FlatList 
      style={styles.list}
      data={Menu}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <View style ={styles.container}>
          <Text style={styles.mealName}>Iteam: {item.Food_Name}</Text>
          <Text style={styles.OtherDetails}>Description: {item.description} min </Text>
          <Text style={styles.OtherDetails}>Course Family: {item.course_family} </Text>
          <Text style={styles.OtherDetails}>Price: {item.price} </Text>
        </View>

        )}
      ></FlatList>
      <View style={styles.userInputView} >
        <TextInput style={styles.input}
          placeholder='Meal Name'
          value={FoodName}
          onChangeText={setFoodName}>
        </TextInput>

        <TextInput style={styles.input}
          placeholder='About'
          value={iteam_Description}
          onChangeText={setDescription}>
        </TextInput>

        <Picker
          selectedValue={course_iteam_family}
          onValueChange={(itemValeu) => setType(itemValeu)}
          style={styles.input}>
          {iteam_family.map((exerciseType) => (
            <Picker.Item label={exerciseType} value={exerciseType} key={exerciseType} />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder='Value price'
          value={Iteam_price}
          onChangeText={setIteam_price}>
        </TextInput>


        <TouchableHighlight onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}> Save</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    padding: 20,
    width:"100%"
  },
  list: {
    maxHeight: 8000,
  },
  itemContainer: {
    flex: 2,
    padding: 25,
    marginVertical: 7,
    backgroundColor: 'white',
  },
  mealName: {
    fontSize: 30,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  OtherDetails: {
    fontSize: 20,
    fontWeight: "bold",
  },
  seprator: {
    height: 10,
  },
  userInputView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 500,
    height: 350,
    marginVertical: 5,
    backgroundColor: '#001418',
    padding: 10,
    marginTop: 120,
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginVertical: -15,
    borderRadius: 5,
    color: 'grey',
    marginTop: 30,
    fontSize: 20,
  },
  button: {
    backgroundColor: 'orange',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 40,
    marginVertical: 10,
    alignItems: 'center',
    marginTop: 40,
    
  },

  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  summaryContainer: {
    flex: 1,
    padding: 80,
    marginVertical: "auto",
    backgroundColor: 'orange',
    alignItems:"stretch"
  },
  summaryHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  summaryText: {
   width:"auto",
    height: 20,
    marginBottom: 8,
    paddingHorizontal: 2,
    color: 'black',
    fontSize: 20,
  },

  Image:{
    marginTop:-50,
    marginBottom:250,    
  },
  Move:{
    flexDirection:'row',
    justifyContent:'space-between'
  }
});