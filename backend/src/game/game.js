module.exports = function createGame() {
  const state = {
    players: {}, //players in the match
    submittedWords: [], //submitted words 'til the moment
    currentRound: 1, //current round
    gameDuration: 1500, //match duration in seconds
    stage: 0, //stage 0: match doesn't start | stage 1: word submission | stage 2: vote stage
    currentText: "", //current text (story) thet players are creating
    lastBestWord: { word: "- ", player: null, votes: 0 }, //store the last best voted word by the players
    status: "Waiting...",
    stageDuration: 15,
    stageClock: 5, //current stage clock
  };

  const observers = [];

  function subscribe(observerFunction) {
    observers.push(observerFunction);
  }

  function notifyAll(command) {
    for (const observerFunction of observers) {
      observerFunction(command);
    }
  }

  function setState(newState) {
    Object.assign(state, newState);
  }

  function start() {
    const frequency = 1000;
    setInterval(changeStage, frequency);
  }

  function addPlayer(command) {
    const playerName = command.player;
    const playerLevel = command.playerLevel;
    state.players[playerName] = {
      score: 0,
      level: playerLevel,
      voted: false,
      submitted: false,
    };

    notifyAll({
      type: "add-player",
      players: state.players,
    });
  }

  function removePlayer(command) {
    const playerName = command.player;

    delete state.players[playerName];

    notifyAll({
      type: "remove-player",
      players: state.players,
    });
  }

  function submitWord(command) {
    const word = command.word;
    const player = command.player;
    if (!state.players[player].submitted) {
      if (wordExists(word)) {
        console.log(`Word already exists`);
        return { status: false, msg: `Word already exists` };
      }
      state.submittedWords.push({ word: word, player: player, votes: 0 });
      state.players[player].submitted = true;
      state.players[player].score += 10;
      notifyAll({
        type: "submitted-word",
        player: player,
        players: state.players,
      });
      return { status: true, msg: "Word submitted with sucess" };
    } else {
      console.log(`Player ${player} already submitted a word!`);
      return {
        status: false,
        msg: `Player ${player} already submitted a word!`,
      };
    }
  }

  function voteWord(command) {
    const w = command.word;
    const player = command.player;
    if (!state.players[player].voted) {
      const word = state.submittedWords.find((e) => e.word == w);
      if (word.player == player) {
        console.log(`Player ${player} try vote in own word!`);
        return {
          status: false,
          msg: `${player}, you can't vote in your own word!`,
        };
      }
      word.votes += 1;
      state.players[player].voted = true;
      state.players[player].score += 20;
      notifyAll({
        type: "player-voted",
        player: player,
        players: state.players,
      });
      return { status: true, msg: `${player} voted the word: ${w} ` };
    } else {
      console.log(`Player ${player} already voted!`);
      return { status: false, msg: `Player ${player} already voted!` };
    }
  }

  function wordPoll() {
    const words = state.submittedWords;
    var best = words[0];
    if (words.length !== 0)
      for (const i of words) {
        if (i.votes > best.votes) best = i;
      }
    else best = { word: "", player: null, votes: 0 };
    return best;
  }

  function wordExists(word) {
    for (const w of state.submittedWords) {
      if (w.word == word) return true;
    }
    return false;
  }

  function changeStage() {
    if (state.gameDuration > 0) {
      if (state.stage === 0) {
        if (state.stageClock > 0) {
          state.stageClock -= 1;
          notifyAll({
            type: "update-stageclock",
            stageClock: state.stageClock,
          });
        } else if (state.stageClock <= 0) {
          console.log(`Round: ${state.currentRound}`);
          state.stage = 1;
          state.stageClock = state.stageDuration;
          state.status = "Waiting players submit words";
          notifyAll({
            type: "submit-stage",
            stage: state.stage,
            stageClock: state.stageClock,
            status: state.status,
          });
        }
      } else if (state.stage === 1) {
        if (state.stageClock > 0) {
          state.stageClock -= 1;
          notifyAll({
            type: "update-stageclock",
            stageClock: state.stageClock,
          });
        } else if (state.stageClock <= 0) {
          state.stage = 2;
          state.stageClock = state.stageDuration;
          state.status = "Waiting players to vote";
          notifyAll({
            type: "vote-stage",
            stage: state.stage,
            stageClock: state.stageClock,
            words: state.submittedWords,
            status: state.status,
          });
        }
      } else if (state.stage === 2) {
        if (state.stageClock > 0) {
          state.stageClock -= 1;
          notifyAll({
            type: "update-stageclock",
            stageClock: state.stageClock,
          });
        } else if (state.stageClock <= 0) {
          state.lastBestWord = wordPoll();
          state.currentText +=
            state.lastBestWord.word != "" ? `${state.lastBestWord.word} ` : "";
          const wordPlayer = state.lastBestWord.player;
          if (wordPlayer != null) state.players[wordPlayer].score += 100;
          console.log(state.players[wordPlayer]);
          state.stage = 0;
          state.stageClock = 5;
          console.log(state);
          state.submittedWords = [];
          state.currentRound += 1;
          for (const p in state.players) state.players[p].voted = false;
          for (const p in state.players) state.players[p].submitted = false;
          state.status = "Waiting...";
          notifyAll({
            type: "waiting-stage",
            stage: state.stage,
            stageClock: state.stageClock,
            text: state.currentText,
            words: state.submittedWords,
            status: state.status,
            round: state.currentRound,
            bestWordPlayer: {
              player: wordPlayer != null ? wordPlayer : null,
              score:
                wordPlayer != null ? state.players[wordPlayer].score : null,
            },
            players: state.players,
          });
        }
      }
      state.gameDuration -= 1;
      //console.log(state.gameDuration)
      notifyAll({
        type: "update-duration",
        duration: state.gameDuration,
      });
    } else {
      state.status = "Game over!";
      console.log(state.status);
      notifyAll({
        type: "game-over",
      });
    }
  }

  return {
    state,
    subscribe,
    setState,
    start,
    addPlayer,
    removePlayer,
    submitWord,
    voteWord,
    wordPoll,
    changeStage,
    wordExists,
  };
};
