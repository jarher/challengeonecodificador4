const inputText = document.getElementById("encryptText");
const outputText = document.getElementById("decryptText");
const encryptButton = document.getElementById("encrypt");
const decryptButton = document.getElementById("decrypt");
const copyButton = document.getElementById("copy");
const modalButton = document.getElementById("modalButton");
const timeOut = 200;
// height adjustment
//input text container
const heightInput = () => {
  let scrollInputText = inputText.scrollHeight;

  let inputRows = inputText.rows;

  inputText.addEventListener("keydown", () => {
    if (inputText.scrollHeight > scrollInputText) {
      scrollInputText = inputText.scrollHeight;
      inputRows++;
      inputText.rows = inputRows;
    }
    if (!inputText.value) {
      changeVisibility("null");
      inputText.rows = 2;
    }
  });
};
//output text container
const heightOutput = (element) => {
  const output = document.getElementById(element);
  let rows = Math.ceil(output.scrollHeight / 30);
  output.rows = rows;
};

const encrypt = () => {
  let newWord = "";

  let newText = "";

  if (!inputText.value) {
    openModal("Ingrese un texto para encriptar");
    changeVisibility("null");
  } else {
    if (/[^a-z^\s]/.test(inputText.value)) {
      openModal(
        "No se aceptan acentos, carácteres especiales, números o mayúsculas"
      );
      changeVisibility("error");
    } else {
      inputText.value.split(" ").forEach((word) => {
        word.split("").forEach((letter) => {
          if (letter === "a") {
            newWord += "ai";
          } else if (letter === "e") {
            newWord += "enter";
          } else if (letter === "i") {
            newWord += "imes";
          } else if (letter === "o") {
            newWord += "ober";
          } else if (letter === "u") {
            newWord += "ufat";
          } else {
            newWord += letter;
          }
        });

        newText += newWord + " ";

        newWord = "";
      });
    }

    outputText.value = newText;

    changeVisibility("encrypt");

    heightOutput("decryptText");
  }
};
const decrypt = () => {
  outputText.value = outputText.value
    .replaceAll("ai", "a")
    .replaceAll("enter", "e")
    .replaceAll("imes", "i")
    .replaceAll("ober", "o")
    .replaceAll("ufat", "u");
};
const copyText = async () => {
  navigator.clipboard
    .writeText(document.getElementById("decryptText").value)
    .then(
      () => {
        openModal("texto copiado");
      },
      () => {
        openModal("hubo un error, inténtelo de nuevo");
      }
    );
};
const changeVisibility = (value) => {
  const firstContent = document.querySelector(".first-content");
  const copyButton = document.getElementById("copy");
  

  const elements = [outputText, copyButton, firstContent];

  if (value === "encrypt") {
    elements.map((element) =>
      element === firstContent
        ? element.classList.add("hide")
        : element.classList.remove("hide")
    );

    setTimeout(() => {
      elements.map((element) =>
        element === firstContent
          ? (element.style.opacity = 0)
          : (element.style.opacity = 1)
      );
    }, timeOut);
  }

  if (value === "null" || value === "error") {
    elements.map((element) =>
      element === firstContent
        ? (element.style.opacity = 1)
        : (element.style.opacity = 0)
    );

    setTimeout(() => {
      elements.map((element) =>
        element === firstContent
          ? element.classList.remove("hide")
          : element.classList.add("hide")
      );
    }, timeOut);
  }
};

const openModal = (text) => {
  const modal = document.querySelector(".modal-wrapper");
  const modalText = document.querySelector(".modal-wrapper p");
  modalText.textContent = text;
  modal.classList.remove("hide");
  setTimeout(() => {
    modal.classList.add("opacity-1");
  }, timeOut);
};
const closeModal = () => {
  const modal = document.querySelector(".modal-wrapper");
  modal.classList.remove("opacity-1");
  setTimeout(() => {
    modal.classList.add("hide");
  }, timeOut);
};

document.addEventListener("click", (event) => {
  if (event.target.id === "encrypt") {
    encrypt();
  }
  if (event.target.id === "decrypt") {
    decrypt();
  }
  if (event.target.id === "copy") {
    copyText();
  }
  if (event.target.id === "modalButton") {
    closeModal();
  }
});

heightInput();
