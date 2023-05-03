const DrinkList = () => {
  const { getAll } = useDrinkContext();
  const drinks = getAll();
  return null;
};

const DrinkDetails = ({ id }) => {
  const { getOne } = useDrinkContext();
  const drink = getOne(id);

  return null;
};

const DrinkEdit = ({ id }) => {
  const { getOne, update, remove } = useDrinkContext();
  const drink = getOne(id);
  const handleSave = (data) => {
    update(id, data);
  };
  const handleRemove = () => {
    remove(id);
  };
  return null;
};

const DrinkCreate = () => {
  const { create } = useDrinkContext();
  const handleSave = (data) => {
    create(data);
  };
  return null;
};
