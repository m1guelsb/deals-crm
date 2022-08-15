import { api } from "@/services/axios";

export const getComboboxOptions = async (
  searchUrl: string,
  seachValue: string
) => {
  const { data } = await api.get<any[]>(searchUrl, {
    params: {
      name_like: seachValue,
      _limit: 10,
    },
  });

  const options = data.map((option) => {
    return {
      label: option.name,
      value: option.id.toString(),
    };
  });

  return options;
};
