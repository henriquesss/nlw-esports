import { View, FlatList, Image } from 'react-native';

import { styles } from './styles';

import { Heading } from '../../components/Heading';
import { GameCard } from '../../components/GameCard';

import { GAMES } from '../../utils/games';

import LogoImg from '../../assets/logo-nlw-esports.png'

export function Home() {
  return (
    <View style={styles.container}>
        <Image
            source={LogoImg}
            style={styles.logo}
        />

        <Heading
          title="Encontre seu duo!"
          subtitle="Seleciona o game que desja jogar..."
        />

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
          data={GAMES}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard
              data={item}
            />
          )}
        />
    </View>
  );
}