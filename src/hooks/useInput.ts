import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";

type useInputReturn<T> = {
  value: T;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  setValue: Dispatch<SetStateAction<T>>;
};

function useInput<T>(defaultValue: T): useInputReturn<T> {
  const [value, setValue] = useState<T>(defaultValue);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValue(e.target.value as unknown as T),
    [],
  );

  return { value, setValue, onChange };
}

export default useInput;
