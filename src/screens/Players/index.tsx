import { FlatList } from "react-native";
import { Header } from "@components/Header";
import { Input } from "@components/input";
import { Filter } from "@components/Filter";
import { ButtonIcon } from "@components/Buttonicon";
import { Highlight } from "@components/Highlight";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { useState } from "react";

export function Players(){
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState([]);

  return(
    <Container>
      <Header showBackButton />

      <Highlight 
        title="Nome da turma"
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

    </Container>
  );
}
