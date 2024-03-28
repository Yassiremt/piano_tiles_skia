import { useEffect, useState } from "react";
import { notes } from "../notes";
import { Sound } from "expo-av/build/Audio";

const useNotesLoader = () => {
  const [notesSounds, setNoteSounds] =
    useState<{ name: string; sound: Sound }[]>();

  useEffect(() => {
    loadAllNotes();
  }, []);

  const loadAllNotes = async () => {
    const tempNotes = notes.map(async (note) => {
      const { sound } = await Sound.createAsync(note.source);
      return { name: note.name, sound };
    });

    const res = await Promise.all(tempNotes);

    setNoteSounds(res);
  };

  return [notesSounds];
};

export { useNotesLoader };
