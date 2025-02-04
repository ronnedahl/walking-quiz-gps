import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';

// Importera frågorna
import questions from './questions';
import locations from './locations'; // Importera locations

const getRandomQuestions = (allQuestions, count) => {
 const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
 return shuffled.slice(0, count);
};

const TRIGGER_DISTANCE = 50; 

const generatePlaces = () => {
 const randomQuestions = getRandomQuestions(questions, locations.length);
 
 return locations.map((location, index) => ({
   id: `place-${index + 1}`,
   name: location.name || `Plats ${index + 1}`,
   latitude: location.lat,
   longitude: location.lng,
   question: randomQuestions[index],
   active: true,
   answered: false
 }));
};



export default function App() {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState(generatePlaces());
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

  const checkNearbyPlaces = () => {
    if (!location) return;

    places.forEach((place) => {
      if (place.active && !answeredQuestions.has(place.id)) {
        const distance = calculateDistance(
          location.coords.latitude,
          location.coords.longitude,
          place.latitude,
          place.longitude
        );

        if (distance <= TRIGGER_DISTANCE) {
          setCurrentQuestion({
            ...place.question,
            placeId: place.id
          });
        }
      }
    });
  };

  const handleAnswer = (answer) => {
    if (!currentQuestion) return;

    const isCorrect = answer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    Alert.alert(
      isCorrect ? 'Rätt svar!' : 'Fel svar!',
      `Du har ${score + (isCorrect ? 1 : 0)} rätt av ${answeredQuestions.size + 1} frågor`,
      [{ text: 'OK' }]
    );

    // Markera platsen som besvarad
    const newAnsweredQuestions = new Set(answeredQuestions);
    newAnsweredQuestions.add(currentQuestion.placeId);
    setAnsweredQuestions(newAnsweredQuestions);
    setCurrentQuestion(null);

    // Kolla om alla frågor är besvarade
    if (newAnsweredQuestions.size === 13) {
      Alert.alert(
        'Grattis!',
        `Du har slutfört alla frågor! Ditt slutresultat är ${score + (isCorrect ? 1 : 0)} rätt av 13.`,
        [{ text: 'OK' }]
      );
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // Starta platsövervakning
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required');
        return;
      }

      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 5,
          timeInterval: 3000,
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );

      return () => {
        if (locationSubscription) {
          locationSubscription.remove();
        }
      };
    })();
  }, []);

  // Kör checken när positionen ändras
  useEffect(() => {
    if (location) {
      checkNearbyPlaces();
    }
  }, [location]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#1a2236', '#0d1117']}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.scoreText}>Poäng: {score} / {locations.length}</Text>
        </View>

        {location && places
          .filter(place => !answeredQuestions.has(place.id))
          .map(place => {
            const distance = calculateDistance(
              location.coords.latitude,
              location.coords.longitude,
              place.latitude,
              place.longitude
            );
            return { ...place, distance };
          })
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 1)
          .map(place => (
            <View key={place.id} style={styles.card}>
              <Text style={styles.cardTitle}>{place.name}</Text>
              <View style={styles.distanceContainer}>
                <Text style={styles.distanceText}>
                  Avstånd: {place.distance.toFixed(1)}m
                </Text>
              </View>
            </View>
          ))}

        {currentQuestion ? (
          <View style={styles.card}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            {Object.entries(currentQuestion.answers).map(([key, value]) => (
              <TouchableOpacity
                key={key}
                style={styles.button}
                onPress={() => handleAnswer(key)}
              >
                <Text style={styles.buttonText}>{key}: {value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.infoText}>
              Hitta nästa fråga! {locations.length - answeredQuestions.size} frågor kvar.
            </Text>
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
  },
  questionText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(56, 139, 253, 0.15)',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(56, 139, 253, 0.3)',
  },
  buttonText: {
    color: '#58a6ff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  distanceContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  distanceText: {
    color: '#8b949e',
    fontSize: 16,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 18,
    color: '#8b949e',
    textAlign: 'center',
  },
});