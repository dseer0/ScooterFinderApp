import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {deletepin, getPinInfo} from '../components/Client';
import MapView from 'react-native-maps';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const Comment = ({children, who}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.commentContainer}>
      <Text
        style={[
          styles.commentTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {who}
      </Text>
      <Text
        style={[
          styles.commentDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const MarkerScreen = ({route, navigation}) => {
  const id = route.params.markerId;
  const token = route.params.token;
  const isDarkMode = useColorScheme() === 'dark';
  const markerDescription = route.params.description;
  const comments = route.params.comments;

  console.log('=> ' + comments);

  const [desc, setDesc] = useState('');
  useState(() => {
    setDesc(markerDescription);
  }, [markerDescription]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: Colors.white,
          }}>
          <Section title="Pin Description">{desc}</Section>
          <Text
            style={[
              styles.CommentText,
              {
                color: Colors.dark,
              },
            ]}>
            Comments:
          </Text>
          {/*<Comment who="Alan">easeas</Comment>*/}
          {/*<Comment who="Alan">easeas</Comment>*/}
          {/*<Comment who="Alan">easeas</Comment>*/}
          {/*<Comment who="Alan">easeas</Comment>*/}
          {comments.map((comment, i) => (
            <Comment key={i} who={'nickname: ' + comment.displayName}>
              {comment.content}
            </Comment>
          ))}

          <TouchableOpacity
            style={styles.buttonAddComment}
            onPress={() => {
              navigation.navigate('AddComment', {
                token: token,
                markerId: id,
              });
            }}>
            <Text style={styles.buttontxt}>Add Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonEdit}
            onPress={() => {
              getPinInfo(id, token).then(r => {
                navigation.navigate('EditMarkerScreen', {
                  token: token,
                  markerId: id,
                  description: r.description,
                });
              });
            }}>
            <Text style={styles.buttontxt}>Edit Description</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonDelete}
            onPress={() => {
              deletepin(id, token).then(() => {
                navigation.navigate('MapScreen', {token: token});
              });
            }}>
            <Text style={styles.buttontxt}>Delete Pin</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  CommentText: {
    marginTop: 20,
    paddingHorizontal: 20,
    fontWeight: '600',

    fontSize: 24,
  },

  commentContainer: {
    marginTop: 28,
    paddingHorizontal: 24,
  },
  commentTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  commentDescription: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '400',
  },

  highlight: {
    fontWeight: '700',
  },
  buttonAddComment: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F7B05B',
    marginTop: 20,
  },
  buttonEdit: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F7CE5B',
  },
  buttonDelete: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1F1300',
  },
  buttontxt: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MarkerScreen;
