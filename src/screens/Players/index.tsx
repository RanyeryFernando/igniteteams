import { Header } from "@components/Header";
import { Input } from "@components/input";
import { ButtonIcon } from "@components/Buttonicon";
import { Highlight } from "@components/Highlight";
import { Container, Form } from "./styles";

export function Players(){
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
    </Container>
  );
}
