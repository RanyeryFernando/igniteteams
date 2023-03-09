import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { Alert, FlatList } from "react-native";
import { Header } from "@components/Header";
import { Input } from "@components/input";
import { Filter } from "@components/Filter";
import { ButtonIcon } from "@components/Buttonicon";
import { PlayerCard } from "@components/PlayerCard";
import { Highlight } from "@components/Highlight";
import { ListEmpyt } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { AppError } from "@utils/AppError";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";

type RouteParams = {
  group: string;
}

export async function Players(){
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const route = useRoute();

  const { group } = route.params as RouteParams;

  async function handleAddPlayers(){
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.');
    }
  }

  const newPlayer = {
    name: newPlayerName,
    team,
    }
    try {
      await playerAddByGroup(newPlayer, group );

    }catch (error) {
      if(error instanceof AppError){
        Alert.alert('Nova pessoa', error.message);
      }else{
        console.log(error);
        Alert.alert('Nova pessoa', 'Não foi possível adicionar');
      }
  }

  async function fetchPlayersByTeam(){
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert('Pessoas', 'Não foi possivel carregar as pessoas do time selecionado');
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, []);

  return(
    <Container>
      <Header showBackButton />

      <Highlight 
        title={group}
        subtitle="adicione a galera e separe os times"
      />

    <Form>
      <Input
        onChangeText={setNewPlayerName}
        placeholder="Nome da pessoa"
        autoCorrect={false}
      />
      <ButtonIcon 
        icon="add"
        onPress={handleAddPlayers}
      />
    </Form>

    <HeaderList>
      <FlatList 
        data={['Time A', 'Time B']}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Filter 
            title={item}
            isActive={item === team}
            onPress={() => setTeam(item)}
          />
        )}
        horizontal
      />
      <NumbersOfPlayers>
        {players.length}
      </NumbersOfPlayers>
    </HeaderList>

    <FlatList 
      data={players}
      keyExtractor={item => item.name}
      renderItem={({ item }) => (
        <PlayerCard 
          name={item.name}
          onRemove={() => {}}
        />
      )}
      ListEmptyComponent={() => (
        <ListEmpyt 
          message="Não há pessoas nesse time."
        />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        {paddingBottom: 100 },
        players.length === 0 && { flex: 1 },
      ]}
    />

    <Button 
      title="Remover Turma"
      type="SECONDARY"
    />
    </Container>
  );
}
