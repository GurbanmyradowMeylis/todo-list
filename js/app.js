let todoList = [],
  identifier = 1;
// ! when clickes the button add
document.getElementById("add").addEventListener("click", () => {
  adderTodoList(identifier, inputValueRecipient(), getDate(), getDate(), true);
});

document.getElementById("input-content").addEventListener("keydown", (ev) => {
  if (ev.key.toLowerCase() === "enter") {
    adderTodoList(
      identifier,
      inputValueRecipient(),
      getDate(),
      getDate(),
      true
    );
  }
});

// ! gets input's value and returns it
function inputValueRecipient() {
  return document.getElementsByTagName("input").item(0).value;
}

// ! gets date of current time
function getDate() {
  let d = new Date();
  return `${
    d.getMonth() + 1
  }.${d.getDate()}.${d.getFullYear()} / ${d.getSeconds()} : ${d.getMinutes()} : ${d.getHours()}`;
}

// ! copies the svg
function svgCopier(editor1, remover1) {
  const editor = editor1.cloneNode(true);
  const remover = remover1.cloneNode(true);
  remover.setAttribute("class", "recycle_bin-primary");
  editor.setAttribute("class", "editor-primary");
  return {
    editor,
    remover,
  };
}

// ! will get the data when site loaded
function gettingInfo() {
  let tempArr = JSON.parse(localStorage.getItem("todo"));
  if (tempArr.length != 0) {
    todoList = tempArr;
    todoList.forEach((item) => {
      adderTodoList(item.id, item.todo, item.createdAt, item.updatedAt, false);
    });
  }
}
// ! will be something before user leave the site
function savingInfo() {
  localStorage.setItem("todo", JSON.stringify(todoList));
}

// ! adds information into the global array (todoList)
function addTodo(id, todo, createdAt, updatedAt) {
  todoList.push({
    id,
    createdAt,
    todo,
    updatedAt,
  });
}

function adderTodoList(
  cardId,
  cardContent,
  cardCreatedAt,
  cardUpdatedAt,
  isAdd
) {
  // ! creates elements of card
  let cards = document.getElementById("cards"),
    wrapperOfCard = document.getElementById("wrapperOfCard"),
    container = document.createElement("div"),
    containerOfId = document.createElement("div"),
    id = document.createElement("h1"),
    containerOfContent = document.createElement("div"),
    content = document.createElement("p"),
    containerOfDate = document.createElement("div"),
    createdAt = document.createElement("p"),
    updatedAt = document.createElement("p"),
    containerOfSvgs = document.createElement("div"),
    containerOfRemover = document.createElement("a"),
    containerOfEditor = document.createElement("a"),
    remover = document.getElementById("remover"),
    editor = document.getElementById("editor");
  // ! end

  // ! sets classnames
  container.className = "card";
  content.className = "text-lg";

  containerOfDate.className = "text-[#999999] flex-auto";
  containerOfSvgs.className = "card__svgs";
  id.className = "card__id";
  // ! end

  // ! increments the identifier
  identifier++;
  let idForInput;
  // ! sets text to content. text --that in input
  content.innerText = cardContent;
  if (isAdd) {
    if (todoList.length == 0) {
      // ! pushes info from card into the array
      id.innerText = `Id : ${cardId}`;
      addTodo(cardId, content.innerText, getDate(), getDate());
      idForInput = cardId;
    } else {
      idForInput = todoList[todoList.length - 1].id + 1;
      id.innerText = `Id : ${todoList[todoList.length - 1].id + 1}`;
      addTodo(
        todoList[todoList.length - 1].id + 1,
        content.innerText,
        getDate(),
        getDate()
      );
    }
  } else {
    id.innerText = `Id : ${cardId}`;
    idForInput = cardId;
  }

  // ! if the card empty
  if (content.length == 0) {
    containerOfContent.className = "break-all flex-auto h-7";
  } else {
    containerOfContent.className = "break-all flex-auto font-normal";
  }
  // ! gets date and sets into these element
  createdAt.innerText = `Created at : ${cardCreatedAt}`;
  updatedAt.innerText = `Updated at : ${cardUpdatedAt}`;

  // ! removes the card of to do
  containerOfRemover.addEventListener("click", () => {
    if (confirm("Are sure to remove")) {
      container.remove();
      let currentId = id.innerText.split(": ")[1];
      todoList.splice(
        todoList.findIndex((item, i) => item.id == currentId),
        1
      );
    }
  });

  let fullInputId = `iasqgqedwwdsd-1fbhiewbufbcqalruvcbjqw3ui-nbuv29hd12bmn${idForInput}uoqbfljqenI30EGDBGNBWKEH`;
  containerOfEditor.href = `#${fullInputId}`;

  // ! appends childs into the parent
  let clonedEditor = svgCopier(editor, remover).editor;
  containerOfId.append(id);
  containerOfContent.append(content);
  containerOfDate.append(createdAt, updatedAt);
  containerOfEditor.append(clonedEditor);
  containerOfRemover.append(svgCopier(editor, remover).remover);

  // ! edit section
  let active = false;
  clonedEditor.addEventListener("click", () => {
    if (!active) {
      let containerOfEdit = document.createElement("div"),
        input = document.createElement("input"),
        button = document.createElement("button");
      button.innerText = "edit";
      button.className = "button-primary ml-1 w-[20%]";
      input.className = "input w-[75%] rounded-md";
      input.type = "text";
      input.id = fullInputId;
      containerOfEdit.id = "editContainer";
      input.value = content.innerText;
      active = !active;
      content.style.display = "none";
      containerOfEdit.append(input, button);
      console.log(document.getElementById(fullInputId));
      containerOfContent.append(containerOfEdit);
      input.addEventListener("keydown", (ev) => {
        if (ev.key.toLowerCase() == "enter") {
          content.style.display = "block";
          content.innerText = input.value;
          containerOfEdit.remove();
          active = !active;
          let currentId = id.innerText.split(": ")[1];
          todoList.splice(
            todoList.findIndex((item) => item.id == currentId),
            1,
            {
              id: Number(currentId),
              todo: content.innerText,
              createdAt: createdAt.innerText.slice(12),
              updatedAt: getDate(),
            }
          );
          updatedAt.innerText = `Updated at : ${getDate()}`;
          // ! if the card's content empty
          if (content.innerText == 0) {
            containerOfContent.className = "break-all flex-auto h-7";
          }
        }
      });
      button.addEventListener("click", () => {
        content.style.display = "block";
        content.innerText = input.value;
        containerOfEdit.remove();
        active = !active;
        let currentId = id.innerText.split(": ")[1];
        todoList.splice(
          todoList.findIndex((item) => item.id == currentId),
          1,
          {
            id: Number(currentId),
            todo: content.innerText,
            createdAt: createdAt.innerText.slice(12),
            updatedAt: getDate(),
          }
        );
        updatedAt.innerText = `Updated at : ${getDate()}`;
        // ! if the card's content empty
        if (content.innerText == 0) {
          containerOfContent.className = "break-all flex-auto h-7";
        }
      });
    } else {
      document.getElementById(fullInputId).addEventListener("keydown", (ev) => {
        if (ev.key.toLowerCase() == "enter") {
          document.getElementById("editContainer").remove();
          content.style.display = "block";
          active = !active;
        }
      });
    }
  });

  // ! appending childs continues even here
  containerOfSvgs.append(containerOfRemover, containerOfEditor);
  cards.append(wrapperOfCard);
  wrapperOfCard.append(container);
  container.append(
    containerOfId,
    containerOfContent,
    containerOfDate,
    containerOfSvgs
  );
  // ! end
}

function clearAll() {
  if (confirm("Are you sure to remove all the cards")) {
    document.getElementById("wrapperOfCard").remove();
    localStorage.clear();
    todoList = [];
    let parentCard = document.createElement("div");
    parentCard.className = "cards__parent-cards";
    parentCard.id = "wrapperOfCard";
    document.getElementById("cards").append(parentCard);
    identifier = 1;
  }
}

document.getElementById("removerAll").addEventListener("click", () => {
  clearAll();
});
