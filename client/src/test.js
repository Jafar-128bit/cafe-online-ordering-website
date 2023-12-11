const item = {
    id: 12,
    name: "jafar",
};

const state = [{id: 12,}, {id: 10,}, {id: 13,}, {id: 14,}, {id: 23,}];

const isIdPresent = state.some((element) => element.id === item.id);

console.log(isIdPresent);
