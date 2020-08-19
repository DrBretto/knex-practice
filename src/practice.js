require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});

const searchTerm = "fish";

function drill1(searchTerm) {
  knexInstance
    .select("id", "name")
    .from("shopping_list")
    .where("name", "ILIKE", `%${searchTerm}%`)
    .then((result) => {
      console.log(result);
    });
}

drill1(searchTerm);

function drill2(pageNumber) {
  const productsPerPage = 6;
  const offset = productsPerPage * (pageNumber - 1);
  knexInstance
    .select("id", "name")
    .from("shopping_list")
    .limit(productsPerPage)
    .offset(offset)
    .then((result) => {
      console.log(result);
    });
}

drill2(2);

function drill3() {
  knexInstance
    .select("id", "name")
    .from("shopping_list")
    .where("name", "ILIKE", `%${searchTerm}%`)
    .then((result) => {
      console.log(result);
    });
}

// function mostPopularVideosForDays(days) {
//   knexInstance
//     .select('video_name', 'region')
//     .count('date_viewed AS views')
//     .where(
//       'date_viewed',
//       '>',
//       knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
//     )
//     .from('whopipe_video_views')
//     .groupBy('video_name', 'region')
//     .orderBy([
//       { column: 'region', order: 'ASC' },
//       { column: 'views', order: 'DESC' },
//     ])
//     .then(result => {
//       console.log(result)
//     })
// }
