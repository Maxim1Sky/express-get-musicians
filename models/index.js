const Band = require("./Band");
const Musician = require("./Musician");

Musician.belongsTo(Band);
Band.hasMany(Musician);

async function main() {
  // await slythHouse.setUsers([malfoy, tom]);

  // await houseName.getUsers() <----- theoretically can be used
  // const houseMembers = await House.findOne({
  //   where: { name: "Slytherin" },
  //   include: User,
  // });

  const theBand = await Band.findByPk(1);
  const allMusic = await Musician.findAll();

  await theBand.setMusicians(allMusic);
}

main();

module.exports = {
  Band,
  Musician,
};
