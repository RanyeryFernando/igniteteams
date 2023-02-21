import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native";
import { Header } from "@components/Header";
import { Input } from "@components/input";
import { Filter } from "@components/Filter";
import { ButtonIcon } from "@components/Buttonicon";
import { PlayerCard } from "@components/PlayerCard";
import { Highlight } from "@components/Highlight";
import { ListEmpyt } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

type RouteParams = {
  group: string;
}

export function Players(){
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState([]);

  const route = useRoute();

  const { group } = route.params as RouteParams;

  return(
    <Container>
      <Header showBackButton />

      <Highlight 
        title={group}
        subtitle="adicione a galera e separe os times"
      />

    <Form>
      <Input 
        placeholder="Nome da pessoa"
        autoCorrect={false}
      />
      <ButtonIcon 
        icon="add"
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
      keyExtractor={item => item}
      renderItem={({ item }) => (
        <PlayerCard 
          name={item}
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
