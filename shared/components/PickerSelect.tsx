import { Picker } from "@react-native-picker/picker";

interface PickerSelect {
  selectedValue: string;
  setValue: (value: string) => void;
  //Falrta ponerle que reciba un array de {key, value}
}

export default function PickerSelect({ selectedValue, setValue }: PickerSelect) {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
    >
      <Picker.Item label="Masculino" value="Masculino" />
      <Picker.Item label="Femenino" value="Femenino" />
    </Picker>
  );
}
