import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { WorkOutDetails } from './type/task.Object';


export default function App() {

  const [workouts, setWorkOuts] = useState<WorkOutDetails[]>([
    { WorkOut_Name: "Russian twists", duration: 2, exercise_Type: "Cardio", calories: 75 },
    { WorkOut_Name: "Jumping Jacks", duration: 50, exercise_Type: "Cardio", calories: 50 },
    { WorkOut_Name: "Push-ups", duration: 10, exercise_Type: "Strength", calories: 100 },
  ]);

  const [WorkOutName, setWorkOutName] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [exerciseType, setType] = useState<string>('');
  const [calories, setcalories] = useState<string>('');
  const [totalcalories, settotalcalories] = useState<number>(0);

  const ExerciseType = ['Cardio', 'Strength', 'Flexibility', 'Balance', 'HIIT'];
  const handleSubmit = () => {
    if (WorkOutName && duration && exerciseType && calories) {
      const newWorkout: WorkOutDetails = {
        WorkOut_Name: WorkOutName,
        duration: parseInt(duration),
        exercise_Type: exerciseType,
        calories: parseInt(calories)
      };
      setWorkOuts([...workouts, newWorkout]);
      settotalcalories(totalcalories + newWorkout.calories);
      setWorkOutName('');
      setDuration('');
      setType('None');
      setcalories('');
    }
  }
  const totalworkouts = workouts.length
  return (

    <SafeAreaView style={styles.itemContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}> Fitness tracker</Text>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryHeading}> Today's summary:</Text>
        <View style={styles.summaryContent}>
          <View>
            <Text style={styles.summaryText}>Total workouts:{totalworkouts}</Text>
            <Text style={styles.summaryText}>Total calories burned: {totalcalories} </Text>
          </View>
        </View>
      </View>
      <FlatList
        style={styles.lifeStyle}
        data={workouts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text style={styles.WorkName}>Workout Name: {item.WorkOut_Name}</Text>
            <Text style={styles.OtherDetails}>Duration: {item.duration} min </Text>
            <Text style={styles.OtherDetails}> Workout type: {item.exercise_Type} </Text>
            <Text style={styles.OtherDetails}>Calories burnt: {item.calories} </Text>
          </View>
        )}
      ></FlatList>
      <View style={styles.userInputView} >
        <TextInput style={styles.input}
          placeholder='Work out name'
          value={WorkOutName}
          onChangeText={setWorkOutName}>
        </TextInput>

        <TextInput style={styles.input}
          placeholder='Duratin (min)'
          value={duration}
          onChangeText={setDuration}>
        </TextInput>

        <Picker
          selectedValue={exerciseType}
          onValueChange={(itemValeu) => setType(itemValeu)}
          style={styles.input}>
          {ExerciseType.map((exerciseType) => (
            <Picker.Item label={exerciseType} value={exerciseType} key={exerciseType} />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder='Calories burnt'
          value={calories}
          onChangeText={setcalories}>
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
  },
  lifeStyle: {
    maxHeight: 800,
  },
  itemContainer: {
    flex: 2,
    padding: 25,
    marginVertical: 7,
    backgroundColor: 'grey',
  },
  WorkName: {
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
    color: 'black',
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
    flex: 5,
    padding: 30,
    marginVertical: 9,
    backgroundColor: 'grey',
    alignItems:"stretch"
  },
  summaryHeading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  summaryContent: {
 color:"white",
 width:'100%'
  },
  summaryText: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: 'blacl',
    marginTop: 1,
    fontSize: 20,
  },

});