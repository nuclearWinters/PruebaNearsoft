import React, {useState, useEffect} from 'react';
import {Text, FlatList, View, Image, TextInput} from 'react-native';
import getData from './getData';

export interface IList {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  number: string;
}

const App = () => {
  const [lista, setLista] = useState<IList[]>([]);
  const [value, setValue] = useState('');
  useEffect(() => {
    let mounted = true;
    const fetchList = async () => {
      try {
        const response = await getData();
        if (!mounted) return;
        setLista(response);
      } catch (e) {
        console.log(e);
      }
    };
    fetchList();
    return () => {
      mounted = false;
    };
  }, []);
  const filteredList = lista.filter((item) =>
    (item.firstName + ' ' + item.lastName)
      .toLowerCase()
      .includes(value.toLowerCase()),
  );
  return (
    <View style={{alignItems: 'center'}}>
      <TextInput
        placeholder={'Search by contact name'}
        onChangeText={(text) => {
          setValue(text);
        }}
        value={value}
        style={{
          borderWidth: 1,
          width: 220,
          borderRadius: 10,
          height: 20,
          marginTop: 20,
          fontSize: 16,
          padding: 0,
          paddingHorizontal: 8,
        }}
      />
      <FlatList
        style={{width: 220}}
        data={filteredList}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 6,
                borderBottomWidth: 1,
              }}>
              <Image
                source={{uri: item.image}}
                style={{height: 60, width: 60, borderRadius: 100}}
              />
              <View style={{flex: 1}} />
              <View style={{marginLeft: 20, alignItems: 'flex-end'}}>
                <Text style={{fontWeight: '700'}}>
                  {item.firstName + ' ' + item.lastName}
                </Text>
                <Text style={{color: '#00000080'}}>{item.number}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default App;
