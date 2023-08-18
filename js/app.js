let todoList = [
    {
      id: 0,
      todo: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur minus debitis omnis magni optio, atque dolore quas ipsam fugit, quibusdam asperiores? Itaque sunt, excepturi quae impedit maiores ducimus similique tempora?",
      createdAt: "8.18.2023 / 7 : 5 : 19",
      updatedAt: "8.18.2023 / 7 : 5 : 19",
    },
  ],
  identifier = 1;
// ! when clickes the button add
document.getElementById("add").addEventListener("click", () => {
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
    containerOfRemover = document.createElement("div"),
    containerOfEditor = document.createElement("div"),
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

  // ! sets number card's id
  id.innerText = `Id : ${identifier}`;

  // ! increments the identifier
  identifier++;

  // ! sets text to content. text --that in input
  content.innerText = inputValueRecipient();

  // ! pushes info from card into the array
  addTodo(identifier, content.innerText, getDate(), getDate());

  // ! if the card empty
  if (inputValueRecipient().length == 0) {
    containerOfContent.className = "break-all flex-auto h-7";
  } else {
    containerOfContent.className = "break-all flex-auto font-normal";
  }

  // ! gets date and sets into these element
  createdAt.innerText = `Created at : ${getDate()}`;
  updatedAt.innerText = `Updated at : ${getDate()}`;

  // ! removes the card of to do
  containerOfRemover.addEventListener("click", () => {
    if (confirm("Are sure to remove")) {
      container.remove();
      let currentId = id.innerText.split(": ")[1];
      console.log(todoList);
      todoList.splice(
        todoList.findIndex((item, i) => item.id == currentId),
        1
      );
    }
  });
  // ! appends childs into the parent
  let clonedEditor = svgCopier(editor, remover).editor;
  containerOfId.append(id);
  containerOfContent.append(content);
  containerOfDate.append(createdAt, updatedAt);
  containerOfEditor.append(clonedEditor);
  containerOfRemover.append(svgCopier(editor, remover).remover);

  // ! fill the clasname of the input
  let active = false;
  clonedEditor.addEventListener("click", () => {
    if (!active) {
      let containerOfEdit = document.createElement("div"),
        input = document.createElement("input"),
        button = document.createElement("button");
      button.innerText = "edit";
      button.className = "button-primary ml-1 w-[20%]";
      input.className = "input w-[75%] rounded-md";
      containerOfEdit.id = "editContainer";
      input.value = content.innerText;
      active = !active;
      content.style.display = "none";
      containerOfEdit.append(input, button);
      containerOfContent.append(containerOfEdit);
      button.addEventListener("click", () => {
        content.style.display = "block";
        content.innerText = input.value;
        containerOfEdit.remove();
        active = !active;

        let currentId = id.innerText.split(": ")[1];
        todoList.splice(
          todoList.findIndex((item, i) => item.id == currentId),
          1,
          {
            id: Number(currentId),
            todo: content.innerText,
            createdAt: createdAt.innerText,
            updatedAt: getDate(),
          }
        );
        updatedAt.innerText = `Updated at : ${getDate()}`;
        console.log(todoList);
        // !
        if (content.innerText == 0) {
          containerOfContent.className = "break-all flex-auto h-7";
        }
      });
    } else {
      document.getElementById("editContainer").remove();
      content.style.display = "block";
      active = !active;
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
  // let tempArr = [];
  // try {
  //   tempArr = JSON.parse(localStorage.getItem("todo"));
  //   console.log(tempArr);
  // } catch (error) {
  //   console.log(error);
  // }
}

// ! will be something before user leave the site
function savingInfo() {}

// ! adds information into the global array (todoList)
function addTodo(id, todo, createdAt, updatedAt) {
  todoList.push({
    id,
    createdAt,
    todo,
    updatedAt,
  });
}
