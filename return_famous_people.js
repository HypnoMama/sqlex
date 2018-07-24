module.exports =

{ returnFamousPeople: (result, person) => {
    console.log("Searching ...");
    console.log(`Found ${result.rows.length} person(s) by the name '${person}':`);
    let count = 1;
    result.rows.forEach((row) => {
      console.log(`- ${count}: ${row.first_name} ${row.last_name}, born '${row.birthdate.toISOString().substring(0, 10)}'`);
      count++;
      });
    }
};