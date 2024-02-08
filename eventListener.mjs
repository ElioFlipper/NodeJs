import { EventEmitter } from 'events'

function createNewsFeed() {
  const emitter = new EventEmitter();

  setInterval(() => {
    emitter.emit("newsEvent", "News: A thing happened in a place.");
  }, 1000);

  emitter.on("newsEvent", (data) => {
    console.log(data);
  })

  setInterval(() => {
    emitter.emit("breakingNews", "Breaking news! A BIG thing happened.");
  }, 4000);

  emitter.on("breakingNews", (data) => {
    console.log(data);
  })

  setTimeout(() => {
    emitter.emit("error", new Error("News feed connection error"));
  }, 5000);

  emitter.on("error", (error) => {
    console.error(error);
  })

  return emitter;
}

const newsFeed = createNewsFeed();