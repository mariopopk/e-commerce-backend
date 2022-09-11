import accessories from "./accessories";
import golf from "./golf";
import outerwear from "./outerwear";
import pants from "./pants";
import shirts from "./shirts";
import shorts from "./shorts";
import suits from "./suits";
import sweaters from "./sweaters";
import tees from "./tees";

export default [
  ...accessories.map((product) => {
    return { ...product, categoryId: "109" };
  }),
  ...golf.map((product) => {
    return { ...product, categoryId: "107" };
  }),
  ...outerwear.map((product) => {
    return { ...product, categoryId: "104" };
  }),
  ...pants.map((product) => {
    return { ...product, categoryId: "101" };
  }),
  ...shirts.map((product) => {
    return { ...product, categoryId: "102" };
  }),
  ...shorts.map((product) => {
    return { ...product, categoryId: "105" };
  }),
  ...suits.map((product) => {
    return { ...product, categoryId: "108" };
  }),
  ...sweaters.map((product) => {
    return { ...product, categoryId: "103" };
  }),
  ...tees.map((product) => {
    return { ...product, categoryId: "106" };
  }),
];
