let identifier = 0;
// ! when clickes the button add
document.getElementById("add").addEventListener("click", () => {
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
  container.className = "card";
  content.className = "text-lg";

  containerOfDate.className = "text-[#999999] flex-auto";
  containerOfSvgs.className = "card__svgs";
  // ! for id
  identifier++;
  id.className = "card__id";
  id.innerText = `Id : ${identifier}`;
  content.innerText = inputValueRecipient();
  if (inputValueRecipient().length == 0) {
    containerOfContent.className = "break-all flex-auto h-7";
  } else {
    containerOfContent.className = "break-all flex-auto font-normal";
  }
  createdAt.innerText = `Created at : ${getDate()}`;
  updatedAt.innerText = `Updated at : ${getDate()}`;
  containerOfId.append(id);
  containerOfContent.append(content);
  containerOfDate.append(createdAt, updatedAt);
  containerOfEditor.append(svgCopier(editor, remover).editor);
  containerOfRemover.append(svgCopier(editor, remover).remover);
  containerOfRemover.addEventListener("click", () => {
    container.remove();
    console.log(container);
  });
  containerOfSvgs.append(containerOfRemover, containerOfEditor);
  cards.append(wrapperOfCard);
  wrapperOfCard.append(container);
  container.append(
    containerOfId,
    containerOfContent,
    containerOfDate,
    containerOfSvgs
  );
});

// ! gets input's value
function inputValueRecipient() {
  return document.getElementsByTagName("input").item(0).value;
}

// ! for created at and updated at
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

function editing() {}
