import { Stack, useLocalSearchParams } from "expo-router";
import BookDetails from "../../components/BookDetails";

const mockBooks: any = {
  "1": {
    id: "1",
    title: "O Senhor dos Anéis",
    author: "J. R. R. Tolkien",
    cover: "https://i.imgur.com/GsU7tE8.jpeg",
    description:
      "Uma aventura épica pela Terra Média em busca do Anel do Poder.",
  },
  "2": {
    id: "2",
    title: "1984",
    author: "George Orwell",
    cover: "https://i.imgur.com/NI4s6EK.jpeg",
    description:
      "Em um regime totalitário, Winston começa a questionar tudo ao seu redor.",
  },
};

export default function BookPage() {
  const { id } = useLocalSearchParams();
  const book = mockBooks[id as string];

  return (
    <>
      <Stack.Screen
        options={{
          title: book?.title ?? "Livro",
          headerShown: true,
        }}
      />

      <BookDetails book={book} />
    </>
  );
}
