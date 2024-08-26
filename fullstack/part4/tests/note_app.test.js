const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./tests_helper");
const app = require("../app");
const api = supertest(app);

const Note = require("../modules/note");

beforeEach(async () => {
  await Note.deleteMany({});
  // this wont work because the we are making async functions outside of the beforeEach and it wont wait for them
  // console.log("cleared");
  // helper.initialNotes.forEach(async (note) => {
  //   let newObj = new Note(note);
  //   await newObj.save();
  //   console.log("saved");
  // });
  // console.log("done");
  const noteObjs = helper.initialNotes.map(note => new Note(note))
  const promiseArray = noteObjs.map(note=> note.save())
  await Promise.all(promiseArray)
});

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two notes", async () => {
  const response = await api.get("/api/notes");

  assert.strictEqual(response.body.length, helper.initialNotes.length);
});

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((e) => e.content);
  assert(contents.includes("HTML is easy"));
});

test("a valid note can be added ", async () => {
  const newNote = {
    content: "async/await simplifies making async calls",
    important: true,
  };
  await api
    .post("/api/notes")
    .send(newNote)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await helper.notesInDb();
  // console.log(response)
  assert(response.length, helper.initialNotes.length + 1);
  const contents = response.map((note) => note.content);
  assert(contents.includes("async/await simplifies making async calls"));
});

test("note without content is not added", async () => {
  const newNote = {
    important: true,
  };

  await api.post("/api/notes").send(newNote).expect(400);

  const response = await helper.notesInDb();
  assert(helper.initialNotes.length, response.length);
});

test("a specific note can be viewed", async () => {
  const notes = await helper.notesInDb();
  const firstItemInNotes = notes[0];

  const resultNote = await api
    .get(`/api/notes/${firstItemInNotes.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.deepStrictEqual(firstItemInNotes, resultNote.body);
});

// test("a note can be deleted", async () => {
//   const notes = await helper.notesInDb();

//   const noteDelete = notes[0];

//   const deletedNote = await api
//     .delete(`/api/notes/${noteDelete.id}`)
//     .expect(204);

//   const afterDelete = await helper.notesInDb();

//   const contents = afterDelete.map((note) => note.content);
//   assert(!contents.includes(noteDelete.content));
//   assert.strictEqual(afterDelete.length, helper.initialNotes.length - 1);
// });
after(async () => {
  await mongoose.connection.close();
});
