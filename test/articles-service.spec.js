require("dotenv").config();
const ArticlesService = require("../src/articles-service");
const { expect } = require("chai");
const knex = require("knex");

describe("Articles service object", function () {
  let db;
  let testArticles = [
    {
      id: 1,
      date_published: new Date("2029-01-22T16:28:32.615Z"),

      title: "First test post!",
      content:
        "Anim reprehenderit sint incididunt aliqua magna culpa ipsum ex. Dolor ad sunt anim exercitation. Laborum consectetur sit et do dolor esse adipisicing ad.",
    },
    {
      id: 2,
      date_published: new Date("2100-05-22T16:28:32.615Z"),
      title: "Second test post!",
      content:
        "Consequat laborum dolore mollit officia sit non adipisicing qui deserunt dolore incididunt exercitation pariatur. Mollit ullamco proident magna sunt qui voluptate exercitation reprehenderit velit id culpa. Anim amet anim laborum nulla ex. Eu aliquip laboris non in nisi Lorem amet.",
    },
    {
      id: 3,
      date_published: new Date("1919-12-22T16:28:32.615Z"),
      title: "Third test post!",
      content:
        "Aute officia velit in minim mollit duis. Et irure commodo adipisicing eu ullamco non sit eu velit consequat ex elit minim magna. Cupidatat magna incididunt ut dolore. Aliquip aliquip aliqua deserunt labore eu qui est minim aute occaecat eiusmod sit esse non. Qui culpa laborum elit amet fugiat aliqua do. Nisi id reprehenderit enim deserunt in labore minim elit.",
    },
  ];

  before(() => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
  });

  before(() => db("blogful_articles").truncate());

  after(() => db.destroy());

  afterEach(() => db("blogful_articles").truncate());

  context(`Given 'blogful_articles' has data`, () => {
    before(() => {
      return db.into("blogful_articles").insert(testArticles);
    });

    it(`getAllArticles() resolves all articles from 'blogful_articles' table`, () => {
      return ArticlesService.getAllArticles(db).then((actual) => {
        expect(actual).to.eql(testArticles);
      });
    });
  });

  context(`Given 'blogful_articles' has no data`, () => {
    it(`getAllArticles() resolves an empty array`, () => {
      return ArticlesService.getAllArticles(db).then((actual) => {
        expect(actual).to.eql([]);
      });
    });
  });
});
